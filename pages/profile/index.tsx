import FlatList from "@components/common/FlatList";
import CartItemCard from "@components/layout/cart/CartItemCard";
import { IOrderItem, OrderProductItem } from "@interfaces/IOrder";
import { useAuthStore } from "@store/auth/auth.store";
import useCartStore from "@store/cart/useCartStore";
import useOrderStore from "@store/order/useOrderStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { DataScroller } from "primereact/datascroller";
import { useEffect, useState } from "react";
import styles from "./styles.module.css"
import useUserData, { IUserProfile } from "app/hooks/useUserData";
import urls from "@config/urls";
import Footer from "@components/layout/footer";

const Profile = () => {
  const { userSession, logout } = useAuthStore();
  const { cartData } = useCartStore();
  const { orders } = useOrderStore();
  const router = useRouter();
  const {getUserData} = useUserData();

  const [userData, setUserData] = useState<IUserProfile>();

  useEffect(() => {
    actualizarPedidos();

    if (userSession.token === '') {
      router.replace("/");
    }
    getUserData().then(data =>  setUserData(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSession.token, router]);

  if (!userSession) {
    return null; // O un spinner de carga mientras redirige
  }

  function actualizarPedidos() {
    // setPedidos([]);
  }

  return (
    <>
  
    <main className="px-4 w-full min-h-screen flex items-start py-8"> 
      <section className="grid gap-4 grid-cols-1 lg:grid-cols-4 w-full h-full">
        
        <div className="col-span-1 lg:row-span-2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col lg:h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center p-4 h-full overflow-y-auto">
            <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/avatar.jpg" alt="Avatar del usuario logueado" width={400} height={400} />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userSession.username}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">Telefono: {userData?.first_name} {userData?.last_name}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{userSession.email}</span>

            <span className="text-sm text-gray-500 dark:text-gray-400">Telefono: {userData?.telephone}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Dirección: {userData?.address} {userData? userData["street-number"] : ''}</span>
            <menu className={styles.doubleButton}>
              <button
                className={styles.editButton}
                onClick={() => router.push('/profile/edit')}
              >
                <span className="flex items-center">Editar datos</span>
              </button>
              <button className={styles.logoutButton} onClick={logout}>
                Logout
              </button>
            </menu>
          </div>
        </div>

        <div className="col-span-3 lg:col-span-2 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col lg:h-[calc(100vh-8rem)]">
          <header className="flex justify-between items-center p-4 bg-gray-100">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Carrito</h5>
            <div>
              <Link href="/carrito" className="text-blue-500 hover:text-blue-700">
                Ir a carrito <span className="pi pi-shopping-cart" />
              </Link>
            </div>
          </header>
          <div className="flex-grow overflow-y-auto">
            <div className="h-full w-full max-w-full">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                <FlatList
                  data={cartData}
                  direction="vertical"
                  renderItem={(item) => <CartItemCard item={item} />}
                  renderEmptyList={() => <p>No hay productos en el carrito</p>}
                />
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col lg:h-[calc(100vh-8rem)]">
          <header className="flex justify-between items-center p-4 bg-gray-100">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Ordenes</h5>
            <div>
            {/* <Link href="/carrito" className="text-blue-500 hover:text-blue-700">Ir a carrito <span className="pi pi-shopping-cart" /></Link> */}
            </div>
          </header>
          <div className="flex-grow overflow-y-auto">
            <div className="h-full w-full max-w-xl">
              <DataScroller
                value={orders}
                itemTemplate={(item) => <OrderItem item={item} />}
                rows={5}
                inline
                scrollHeight="100%"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
</>
  )
};

interface OrderItemProps {
  item: IOrderItem
}

const OrderItem = (props: OrderItemProps) => (
  <section className="flex flex-col p-4 border border-gray-300 rounded-md mb-4">
    <header className="flex justify-around">
      <h6 className="font-semibold mb-2">Productos <span className="rounded-full text-white bg-gray-400 px-2">{props.item.products.length}</span></h6>
      <h5><strong>ID </strong> {props.item.id}</h5>
    </header>
    <article className="w-full">
      
      <DataScroller
        value={props.item.products}
        itemTemplate={(item)=> <OrderProductItemDetail item={item}/> } 
        rows={5}
        emptyMessage="vista no disponible"
        inline
        scrollHeight="200px" />
      {props.item.payment_date && <p className="font-light italic">Fecha de pago { props.item.payment_date}</p>} 
    </article>
  </section>
)

interface OrderProductItemProps {
  item: OrderProductItem
}
const OrderProductItemDetail = (props: OrderProductItemProps) => (
  <>
    <article className="flex items-center space-x-3 py-2">
      <figure className="flex-shrink-0">
        <Image src={`${urls.backendUrl}/${props.item.img_front}`} width={50} height={50} alt={props.item.title} className="object-cover rounded" />
      </figure>
      <div className="flex flex-col flex-grow">
        <Link href="#">
          <h4 className="text-base font-medium text-wrap">{props.item.title}</h4>
        </Link> 
        <div className="flex items-center justify-between mt-1">
          <p className="font-extrabold text-sm">{props.item.size}</p>
          <p className={`text-xs inline-flex text-white card rounded-3xl px-2 py-0.5 ${props.item.status === "COMPLETED"? "bg-green-500": "bg-gray-400"}`}>{props.item.status}</p>
        </div>
      </div>
    </article>  
    <hr className="my-1"/>
  </>
);

export default Profile;
