import useCartStore from "@store/cart/useCartStore";
import CartDetailLayout from "@components/cart/CartDetailLayout";
import CartEmptyLayout from "@components/cart/CartEmptyLayout";


export interface CartProps {
  cart: unknown;
}

const Cart = () => {
  const { cartData } = useCartStore();
  console.log('cart data -> ', cartData);
  
  return (
    <div>
      {cartData.length === 0 ? (
        <CartEmptyLayout />
      ) : (
        <CartDetailLayout cartData={cartData} />
      )}
    </div>
  );
};

export default Cart;
