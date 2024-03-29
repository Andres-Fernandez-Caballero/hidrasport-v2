import useCartStore from "@store/useCartStore";
import CartDetailLayout from "@components/cart/CartDetailLayout";
import CartEmptyLayout from "@components/cart/CartEmptyLayout";

export interface CartProps {
  cart: unknown;
}

const Cart = () => {
  const { cartData } = useCartStore();
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
