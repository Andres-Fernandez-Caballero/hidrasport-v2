import { create } from "zustand";
import {
  iCartProduct,
  ICartAddProduct,
} from "../../interfaces/ICart";
import { CartStore } from "./cart.contracts";
import { fetchCartAdd, fetchCartDetails, fetchCartRemove, fetchTotalAmount } from "./cart.fetchers";
import { useAuthStore } from "@store/auth/auth.store";

const useCartStore = create<CartStore>((set, get) => ({
  /* store data */
  cartData: [],
  totalAmount: 0,
  cartIsLoading: false,


  /* Methods */
  fetchCart: async () => {
    set({ cartIsLoading: true });
    try {
      const data = await fetchCartDetails(useAuthStore.getState().userSession.token);
      
      const cartData: iCartProduct[] = data.cart.items;
      set({ cartData,});
      await get().getTotalAmount()

    } catch (error) {
      console.error("Error al cargar el carrito: " + (error as Error).message);
    } finally {
      set({ cartIsLoading: false });
    }
  },
  addToCart: async (product: ICartAddProduct, quantity: number = 1) => {
    set({ cartIsLoading: true });
    try {
      const token = useAuthStore.getState().userSession.token;
      const isAdded = await fetchCartAdd(token, product, quantity)
      if (!isAdded) throw new Error('could not add product to cart ')

      const data = await fetchCartDetails(token);
      const cartItems: iCartProduct[] = data.cart.items;

      set({ cartData: cartItems });
    } catch (error) {
      throw new Error(

        "Error al cargar el carrito: " + (error as Error).message,
      );
    } finally {
      set({ cartIsLoading: false });
    }
  },

  removeFromCart: async (product: iCartProduct): Promise<void> => {
    const productRequest: ICartAddProduct = {
      size: product.size,
      subProductId: product.subproduct_id
    }

    const token = useAuthStore.getState().userSession.token;
    const isRemoved = await fetchCartRemove(token, productRequest)
    if (!isRemoved) throw new Error('could not remove product from the cart')
    
    get().fetchCart()
    
  },

  addItemToCart: async (product: iCartProduct, quantity = 1) => {
    const productRequest: ICartAddProduct = {
      size: product.size,
      subProductId: product.subproduct_id
    }

    const token = useAuthStore.getState().userSession.token;
      await fetchCartAdd(token, productRequest, quantity)
      get().fetchCart()
  },

  substractItemFromCart: async (product) => {
    console.log(product);
    // TODO: pending feature, need backend implementation
  },

  getTotalAmount: async () => {
    const token = useAuthStore.getState().userSession.token;
    const totalAmount = await fetchTotalAmount(token)
    set({ totalAmount });
    return totalAmount;
  }
}));

export default useCartStore;
