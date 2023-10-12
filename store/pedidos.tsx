import { IOrder } from "@interfaces/IOrder";
import { create } from "zustand";
type productoStore = {
    pedidos : IOrder[]
    pedidosIsLoading: boolean
    fetchPedidos: () => void 
}
const usePedidos = create<productoStore>( (set) => ({
    pedidos: [],
    pedidosIsLoading: false,
    fetchPedidos : async () =>{
        set({pedidosIsLoading: true})
        try {
            const url = "https://hidrasport.com.ar/api/orders/orders/"
            const response = await fetch(url, {
                credentials: "include",
              });
            const data = await response.json()

            const ordersItems : IOrder []= Object.values( data as IOrder) 
            set ({ pedidos : ordersItems})
        } catch (error) {
            throw new Error(
                "Error al cargar el carrito: " + (error as Error).message,
              );
        } finally {
            set ({pedidosIsLoading : false})
        }
    },

})
)
export default usePedidos