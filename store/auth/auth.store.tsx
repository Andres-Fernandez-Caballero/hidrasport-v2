import { LoginDto, RegisterDto } from "@interfaces/IAuth";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import useCartStore from "../cart/useCartStore";
import { AuthStore, AuthData } from "./contracts";
import initialState from "./initalState";
import { fetchLogin, fetchRegister } from "@services/user";
import useOrderStore from "@store/order/useOrderStore";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      userSession: initialState,
      login: async (loginData: LoginDto) => {
        const authData = await fetchLogin(loginData);
        set({ userSession: authData });
        useCartStore.getState().fetchCart();
        useOrderStore.getState().fetchOrders();
      },
      logout: () => {
        set({ userSession: initialState });
        useCartStore.getState().fetchCart();
      },
      register: async (registerDto: RegisterDto) => {
        const authData = await fetchRegister(registerDto);
        set({ userSession: authData });
        useCartStore.getState().fetchCart();
        useOrderStore.getState().fetchOrders();
      },
      isLogedIn: () => get().userSession.token !== "",
      updateUserSession: (data: Partial<AuthData>) => {
        set((state) => ({
          userSession: {
            ...state.userSession,
            ...data,
            profile: {
              ...state.userSession.profile,
              ...(data.profile || {}),
            },
          },
        }));
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
