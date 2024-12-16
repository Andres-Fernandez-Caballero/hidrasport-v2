import { create } from "zustand";

interface SearchBarStore {
    searchBarIsOpen: boolean;
    showSearchBar: () => void;
    hideSearchBar: () => void;
    toggleSearchBar: () => void;
}

export const useSearchBar = create<SearchBarStore>((set) => ({
  searchBarIsOpen: false,
  showSearchBar: () => set({ searchBarIsOpen: true }),
  hideSearchBar: () => set({ searchBarIsOpen: false }),
  toggleSearchBar: () => set((state) => ({ searchBarIsOpen: !state.searchBarIsOpen })),
}));
