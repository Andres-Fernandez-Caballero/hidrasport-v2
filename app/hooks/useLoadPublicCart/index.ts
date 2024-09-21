import { useAuthStore } from '@store/auth/auth.store';
import urls from '@config/urls';
import { IPublicCart } from '@interfaces/ICart';

const useLoadPublicCart = () => {
  const { userSession } = useAuthStore();
  const token = userSession?.token;

  const submitCart = async (cartData: IPublicCart) => {
    try {
      const response = await fetch(`${urls.publicCarts}load-cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit cart');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting cart:', error);
      throw error;
    }
  };

  return { submitCart };
};

export default useLoadPublicCart;
