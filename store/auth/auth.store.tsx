import { LoginDto, RegisterDto } from "@interfaces/IAuth";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import useCartStore from "../cart/useCartStore";
import { AuthStore } from "./contracts";
import initialState from "./initalState";
import { CREDIT_CARD_PAYMENT } from "@interfaces/Ipayment";
import { fetchLogin, fetchRegister } from "@services/user";


export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      userSession: initialState,
      login: async(loginData: LoginDto) => {
        const authData = await fetchLogin(loginData)
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
        const authData = await fetchRegister(registerDto);
        set({
          userSession: authData
        })
        useCartStore.getState().fetchCart()
      },
      isLogedIn: () => {
        return get().userSession.token !== "";
      },
    }),
    { name: "auth-storage", getStorage: () => localStorage },
  ),
);
