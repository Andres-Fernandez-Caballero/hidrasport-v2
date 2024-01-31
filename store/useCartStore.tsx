import { create } from "zustand";
import {
  iCartProduct,
  iCartProductList,
  iCartRequest,
} from "./../interfaces/ICart";

type CartStore = {
  cartData: iCartProduct[];
  cartIsLoading: boolean;
  fetchCart: () => void;
  addToCart: (product: iCartRequest) => void;
};

const useCartStore = create<CartStore>((set) => ({
  cartData: [],
  cartIsLoading: false,
  fetchCart: async () => {
    set({ cartIsLoading: true });
    try {
      const url = `https://hidrasport.com.ar/api/sessions/cart/`;
      const response = await fetch(url, {
        credentials: "include",
      });
      const data = await response.json();

      const cartItems: iCartProduct[] = Object.values(data as iCartProductList);
      set({ cartData: cartItems });
    } catch (error) {
      //throw new Error("Error al cargar el carrito");
      console.error("Error al cargar el carrito: " + (error as Error).message);
    } finally {
      set({ cartIsLoading: false });
    }
  },
  addToCart: async (product: iCartRequest) => {
    set({ cartIsLoading: true });
    try {
      const urlAdd = `https://hidrasport.com.ar/api/sessions/cart/modify/${product.subProductId}/${product.size}/add/1/`;
      await fetch(urlAdd, { credentials: "include" });

      // const cookieAdd = responseAdd.headers.get("set-cookie");
      const urlList = `https://hidrasport.com.ar/api/sessions/cart/`;
      const response = await fetch(urlList, {
        credentials: "include",
      });
      // const cookie = response.headers.get("set-cookie");

      const data = await response.json();

      const cartItems: iCartProduct[] = Object.values(data as iCartProductList);
      set({ cartData: cartItems });
    } catch (error) {
      throw new Error(
        "Error al cargar el carrito: " + (error as Error).message,
      );
    } finally {
      set({ cartIsLoading: false });
    }
  },
}));

export default useCartStore;
