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
    const token = useAuthStore.getState().userSession.token;
    const isAdded = await fetchCartAdd(token, product, quantity)
    console.log(isAdded)
    if (!isAdded) throw new Error('could not add product to cart ')

    const data = await fetchCartDetails(token);
    const cartItems: iCartProduct[] = data.cart.items;

    set({ cartData: cartItems });
    //deprecado?
  },

  removeFromCart: async (product: iCartProduct): Promise<void> => {
    const productRequest: ICartAddProduct = {
      size: product.size,
      subProductId: product.subproduct_id
    }

    const token = useAuthStore.getState().userSession.token;
    const isRemoved = await fetchCartRemove(token, productRequest)
    if (!isRemoved) throw new Error('No se pudo remover el producto del carrito.')
    
    get().fetchCart()
    
  },

  addItemToCart: async (product: iCartProduct | ICartAddProduct, quantity = 1) => {
    let productRequest: ICartAddProduct;
  
    if ('size' in product && 'subproduct_id' in product) {
      productRequest = {
        size: product.size,
        subProductId: product.subproduct_id
      };
    } else {
      productRequest = { ...product };
    }
  
    const token = useAuthStore.getState().userSession.token;
    const isAdded = await fetchCartAdd(token, productRequest, quantity);
    if (!isAdded) throw new Error("No hay Stock del producto.");
    
    get().fetchCart();
  },
  

  substractItemFromCart: async (product) => {
    console.log(product);
    // Deprecated
  },

  getTotalAmount: async () => {
    const token = useAuthStore.getState().userSession.token;
    const totalAmount = await fetchTotalAmount(token)
    set({ totalAmount });
    return totalAmount;
  }
}));

export default useCartStore;
