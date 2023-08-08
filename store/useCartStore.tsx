import { create } from 'zustand';
import { iCartProductList } from './../interfaces/ICart';
import { SERVER_URL } from '@config/index';

type CartStore = {
  cartData: iCartProductList | null;
  fetchCart: () => void;
};

const useCartStore = create<CartStore>((set) => ({
  cartData: null,
  fetchCart: async () => {
    try {
      const response = await fetch(`${SERVER_URL}/api/sessions/cart/`, {
        credentials: 'include'
      });
      const data = await response.json();
      set({ cartData: data });
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  }
}));

export default useCartStore;
