import { create } from "zustand";
import { OrderStore } from "./order.contracts";
import { useAuthStore } from "@store/auth/auth.store";
import { fetchOrders } from "./order.fetchers";
import { persist, createJSONStorage } from "zustand/middleware";

const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],

      fetchOrders: async () => {
        const ordersData = await fetchOrders(useAuthStore.getState().userSession.token);
        set({ orders: ordersData });
      },
    }),
    {
      name: "orders-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOrderStore;
