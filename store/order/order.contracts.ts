import { IOrderItem } from "@interfaces/IOrder"

export type OrderStore = {
    orders: IOrderItem[];

    /**
     * update orders from the server
     * @returns void
     */
    fetchOrders: () => void; 
}