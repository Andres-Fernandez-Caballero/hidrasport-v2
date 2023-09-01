import { create } from "zustand";
import {
  iCartProduct,
  iCartProductList,
  iCartRequest,
} from "./../interfaces/ICart";
import { apiCall } from "tools/apiCall";
import { ResponseApi } from "@pages/api/interfaz";
import { SERVER_URL } from "@config/index";

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
      const cookie = response.headers.get("set-cookie");

      const data = await response.json();
      console.log("data", data);

      const cartItems: iCartProduct[] = Object.values(data as iCartProductList);
      set({ cartData: cartItems });
    } catch (error) {
      throw new Error("Error al cargar el carrito");
    } finally {
      set({ cartIsLoading: false });
    }
  },
  addToCart: async (product: iCartRequest) => {
    set({ cartIsLoading: true });
    try {
      const urlAdd = `https://hidrasport.com.ar/api/sessions/cart/modify/2534/M/add/1/`;
      const responseAdd = await fetch(urlAdd, {
        credentials: "include",
      });
      const dataAdd = await responseAdd.json();
      console.log("dataAdd", dataAdd);

      // const cookieAdd = responseAdd.headers.get("set-cookie");
      const urlList = `https://hidrasport.com.ar/api/sessions/cart/`;
      const response = await fetch(urlList, {
        credentials: "include",
      });
      // const cookie = response.headers.get("set-cookie");

      const data = await response.json();
      console.log("data reload", data);

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
