import { RegisterDto } from "@interfaces/IAuth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "../cart/useCartStore";
import { AuthData, AuthStore } from "./contracts";
import initialState from "./initalState";


export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      userSession: initialState,
      login: (authData: AuthData) => {
        set({
          userSession: authData,
        });
        useCartStore.getState().fetchCart()
      },

      logout: () => {
        set({ userSession: initialState });
        useCartStore.getState().fetchCart()

      },
      register: async (registerDto: RegisterDto) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({
          userSession: {
            token: "123",
            email: registerDto.email,
            username: registerDto.username,
            admin: false,
          },
        });
      },
      isLogedIn: () => {
        return get().userSession.token !== "";
      },
    }),
    { name: "auth-storage", getStorage: () => localStorage },
  ),
);
