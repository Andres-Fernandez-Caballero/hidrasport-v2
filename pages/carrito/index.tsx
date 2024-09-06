import useCartStore from "@store/cart/useCartStore";
import CartDetailLayout from "@components/layout/cart/CartDetailLayout";
import CartEmptyLayout from "@components/layout/cart/CartEmptyLayout";


export interface CartProps {
  cart: unknown;
}

const CartPage = () => {
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

export default CartPage;
