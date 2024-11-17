
import { SERVER_URL } from "@config/index";
import { iCartProduct } from "@interfaces/ICart";
import Image from "next/image";

type CartItemCardProps = {
  item: iCartProduct;
};

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  return (
    <div className="flex flex-col p-4 border border-gray-300 shadow-md rounded-md">
      <Image
        src={`${SERVER_URL}/static${item.img}`}
        alt={item.title ?? 'no description'}
        height={200}
        width={200}
        className="mb-4 w-full h-auto"
      />
      <p className="text-lg font-semibold mb-2">{item.title}</p>
      <p>Size: {item.size}</p>
      <p>Name: {item.title}</p>
      <p>Color: {item.color}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default CartItemCard;
