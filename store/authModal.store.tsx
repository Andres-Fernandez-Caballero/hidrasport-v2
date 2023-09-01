import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Tab = "login" | "register";
export interface AuthModalStore {
  isOpen: boolean;
  tab: Tab;
  openModal: () => void;
  closeModal: () => void;
  goTab(tab: Tab): void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  tab: "login",
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  goTab: (tab: Tab) => set({ tab }),
}));
