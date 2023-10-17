import { SERVER_URL } from "@config/index";
import { iCartProduct } from "@interfaces/ICart";
import Image from "next/image";

type CartItemsProfileProps = {
  item: iCartProduct;
};

const CartItemsProfile: React.FC<CartItemsProfileProps> = ({ item }) => {
  return (
    <div className="p-4 border border-gray-300 shadow-md rounded-md grid grid-cols-2 gap-3">
      <article className="flex items-center">
        <Image
          src={`${SERVER_URL}/static${item.image}`}
          alt={item.title}
          height={200}
          width={200}
          className="mb-4 w-max h-max"
        />
        <p className="text-lg font-semibold mb-2">{item.title}</p>
        <p>Size: {item.size}</p>
        <p>Name: {item.name}</p>
        <p>Color: {item.color}</p>
        <p>Quantity: {item.quantity}</p>
      </article>
    </div>
  );
};
export default CartItemsProfile;
