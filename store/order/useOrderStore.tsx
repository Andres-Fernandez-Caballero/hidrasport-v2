import { create } from "zustand";
import { OrderStore } from "./order.contracts";
import { useAuthStore } from "@store/auth/auth.store";
import { fetchOrders } from "./order.fetchers";
import { persist } from "zustand/middleware";

const useOrderStore = create<OrderStore>()( persist (
    (set) => ({
        /* store data */
        orders: [], 
    
        /* Methods */
        fetchOrders: async() => {
            const ordersData = await fetchOrders(useAuthStore.getState().userSession.token);
            set({ orders: ordersData });
        }
    }),
    { name: "orders-storage", getStorage: () => localStorage }
)
    
)

export default useOrderStore;

