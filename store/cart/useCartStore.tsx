import { create } from "zustand";
import {
  iCartProduct,
  iCartRequest,
} from "../../interfaces/ICart";
import { CartStore } from "./cart.contracts";
import { fetchCartAdd, fetchCartDetails } from "./cart.fetchers";
import { useAuthStore } from "@store/auth.store";



const useCartStore = create<CartStore>((set) => ({
  cartData: [],
  cartIsLoading: false,
  fetchCart: async () => {
    
    set({ cartIsLoading: true });
    try {
      const data = await fetchCartDetails(useAuthStore.getState().userSession.token);
      const cartItems: iCartProduct[] = data.cart.items;
      console.log('store cart -> cart items: ', cartItems);
      set({ cartData: cartItems });
    } catch (error) {
      console.error("Error al cargar el carrito: " + (error as Error).message);
    } finally {
      set({ cartIsLoading: false });
    }
  },
  addToCart: async (product: iCartRequest, quantity:number = 1) => {
    set({ cartIsLoading: true });
    try {
      const token = useAuthStore.getState().userSession.token;
      const isAdded = await fetchCartAdd(token, product, quantity)
      if (!isAdded) throw new Error('could not add product to cart ')
      
      const data = await fetchCartDetails(token);
      const cartItems: iCartProduct[] = data.cart.items;
      console.log('store new item add  -> cart items: ', cartItems);
      
      set({ cartData: cartItems });
    } catch (error) {
      console.log((error as Error).message);
      throw new Error(
        
        "Error al cargar el carrito: " + (error as Error).message,
      );
    } finally {
      set({ cartIsLoading: false });
    }
  },
}));

export default useCartStore;
