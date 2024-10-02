import FormCheckout from "./FormCheckout";
import { iCartProduct } from "@interfaces/ICart";
import { DataScroller } from 'primereact/datascroller';
import Image from "next/image";
import { SERVER_URL } from "@config/index";
import useCartStore from "@store/cart/useCartStore";
import { toast } from "react-toastify";
import styles from "./styles.module.css"

interface CartDetailLayoutProps {
  cartData: iCartProduct[];
}

interface CartItemProps {
  item: iCartProduct;
}

const CartItem = (props: CartItemProps) => {

  const { addItemToCart, removeFromCart } = useCartStore();
  return (
    <div className={styles.itemContainer}>

      <div className={styles.imageContainer}>
        <Image
          width={100}
          height={100}
          quality={30}
          src={SERVER_URL + props.item.img}
          alt={props.item.title}
          className="object-cover object-center"
        />
      </div>

      <div className={styles.detailContainer}>
        <span>
        </span>
          <strong>{props.item.title.length > 28 ? props.item.title.slice(0, 25)+'...' : props.item.title}</strong>
        <div className="flex justify-between">
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            <strong>{props.item.color}</strong>
          </p>
          <p>
            Talle: <strong>{props.item.size}</strong>
          </p>
        </div>
      </div>

      <div className={styles.rightSide}>

        <div className={styles.cantContainer}>
          <button
            className=""
            onClick={() => {
              const toastMessage = toast.loading("retirando producto del carrito ⌛");
              removeFromCart(props.item).then(() => {
                toast.update(toastMessage, {
                  render: "Removido del carrito",
                  type: "success",
                  isLoading: false,
                  autoClose: 2000,
                });
              })
                .catch(e => {
                  console.log(e)
                  toast.update(toastMessage, {
                    render: (e as Error).message,
                    type: "error",
                    isLoading: false,
                    autoClose: 2000,
                  })
                }
                )
            }}
          >
            <i className="fa-solid fa-minus text-red-500"></i>
          </button>
          <span>
            {props.item.quantity}
          </span>
          <button
            className=""
            onClick={() => {
              const toastMessage = toast.loading("Agregando al carrito ⌛");
              addItemToCart(props.item, 1).then(() => {
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
        </div>
        <div className="text-base font-semibold text-gray-900 px-1 dark:text-white">
          <p>$ {props.item.price * props.item.quantity}</p>
        </div>
      </div>


    </div>
  )
}


const CartDetailLayout = ({ cartData }: CartDetailLayoutProps) => (
  <div className="bg-white">
    <main className="py-14  w-100">
      <div className={styles.sectionName}>
        <h2>Carrito</h2>
      </div>
      {/* contenido */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <section className={styles.productsContainer}>
          <DataScroller
            value={cartData}
            itemTemplate={(item) => (<CartItem item={item} />)} rows={cartData.length}
            inline
            scrollHeight="68svh" />
        </section>
        <section className={styles.enviosContainer}>
          <FormCheckout />
        </section>
      </div>
    </main>
  </div>
);

export default CartDetailLayout;
