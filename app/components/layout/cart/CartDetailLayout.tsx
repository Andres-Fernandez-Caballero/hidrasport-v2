import FormCheckout from "./FormCheckout";
import { iCartProduct } from "@interfaces/ICart";
import { DataScroller } from 'primereact/datascroller';
import Image from "next/image";
import { SERVER_URL } from "@config/index";
import useCartStore from "@store/cart/useCartStore";
import { toast } from "react-toastify";

interface CartDetailLayoutProps {
  cartData: iCartProduct[];
}

interface CartItemProps {
  item: iCartProduct;
}

const CartItem = (props: CartItemProps) => {

  const {addItemToCart, removeFromCart } = useCartStore();
  return (
  <div className="grid gap-2">
    <p className="text-lg    font-medium text-gray-900 truncate dark:text-white">
      <strong>{props.item.title}</strong>
    </p>
    <div className="flex justify-around">
      <figure className="flex-shrink-0">
        <Image
          width={100}
          height={100}
          src={SERVER_URL + props.item.img}
          alt={props.item.title}
          className="h-full w-full object-cover object-center"
        />
      </figure>
  
      <menu className="grid grid-cols-3 gap-3">
        <button 
          className=""
          onClick={() => {
            const toastMessage = toast.loading("Agregando al carrito ⌛");
              addItemToCart(props.item).then(()=> {
                toast.update(toastMessage, {
                  render: "Agregado al carrito",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              })
              .catch(e => 
                toast.update(toastMessage, {
                  render: (e as Error).message,
                  type: "error",
                  isLoading: false,
                  autoClose: 2000,
                })
              )
          }}
          >
          <i className="fa-solid fa-plus"></i>
        </button>
        <button 
          className=""
          onClick={() => {
            const toastMessage = toast.loading("retirando producto del carrito ⌛");
              removeFromCart(props.item).then(()=> {
                toast.update(toastMessage, {
                  render: "removido del carrito",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              })
             .catch(e => 
                toast.update(toastMessage, {
                  render: (e as Error).message,
                  type: "error",
                  isLoading: false,
                  autoClose: 2000,
                })
              )
          }}
          >
          <i className="fa-solid fa-trash text-red-500"></i>
        </button>
      </menu>
      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
        <p>$ {props.item.price}</p>
      </div>
    </div>
  
    <div className="flex justify-around">
      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
        Color: <strong>{props.item.color}</strong>
      </p>
      <p>
        Talle: <strong>{props.item.size}</strong>
      </p>
      <p>
        Unidades: <strong>{props.item.quantity}</strong>
      </p>
    </div>
    <hr className="my-4" />
  </div>
  )
}
  

const CartDetailLayout = ({ cartData }: CartDetailLayoutProps) => (
  <div className="bg-white">
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:max-w-7xl md:px-8">
      <h2 className="sr-only text-2xl font-bold tracking-tight text-gray-900">
        Carrito 🛒
      </h2>
      {/* contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="divide-y divide-gray-200 dark:divide-gray-700 flow-root overflow-x-auto p-6">
          <DataScroller
            value={cartData}
            itemTemplate={(item) => (<CartItem item={item} />)} rows={5}
            inline
            scrollHeight="500px"
            header="Deslizá hacia abajo para ver tus productos." />
        </section>
        <aside className="rounded-sm px-4 py-6 sm:px-6 m-4">
          <FormCheckout />
        </aside>
      </div>
    </main>
  </div>
);

export default CartDetailLayout;
