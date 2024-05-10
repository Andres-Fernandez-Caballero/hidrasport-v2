import {  RegisterDto } from "@interfaces/IAuth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthData {
  token: string;
  email: string;
  username: string;
  admin: boolean;
}

export interface AuthStore {
  userSession: AuthData;
  login: (authData: AuthData) => void;
  logout: () => void;
  register: (registerDto: RegisterDto) => Promise<void>;
  isLogedIn: () => boolean;
}

const initialState: AuthData = {
  token: "",
  email: "",
  username: "",
  admin: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      userSession: initialState,
      login: (authData: AuthData) => {
        set({
          userSession: authData,
        });
        console.log('state', useAuthStore.getState());
      },
      logout: () => {
        set({ userSession: initialState });
        console.log('state', useAuthStore.getState());
        
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
