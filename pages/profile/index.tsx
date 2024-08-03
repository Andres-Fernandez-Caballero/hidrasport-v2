import FlatList from "@components/common/FlatList";
import CartItemCard from "@components/layout/cart/CartItemCard";
import { IOrderItem } from "@interfaces/IOrder";
import { useAuthStore } from "@store/auth/auth.store";
import useCartStore from "@store/cart/useCartStore";
import useOrderStore from "@store/order/useOrderStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { DataScroller } from "primereact/datascroller";
import { useEffect } from "react";


const Profile = () => {
  const { userSession, logout, isLogedIn } = useAuthStore();
  const { cartData } = useCartStore();
  const { orders } = useOrderStore();
  const router = useRouter()

  console.log(isLogedIn());
  console.log(userSession);



  useEffect(() => {
    actualizarPedidos();

    if (userSession.token === '') {
      router.replace("/");
    }
  }, [userSession.token, router]);

  if (!userSession) {
    return null; // O un spinner de carga mientras redirige
  }

  function actualizarPedidos() {
    // setPedidos([]);
  }

  return (
    <main className="">
    <header>
      <h1 className="text-gray-700 font-bold text-4xl leading-10 text-justify px-12 invisible">
        Perfil de usuario
      </h1>
    </header>
    <section className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
      <div className="w-full md:max-w-full lg:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-auto">
        <div className="flex flex-col items-center p-5">
          <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/avatar.jpg" alt="Avatar del usuario logueado" width={400} height={400} />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userSession.username}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{userSession.email}</span>
          <menu className="flex mt-6">
            <button
              className="bg-blue-500 text-white border border-black rounded-tl-xl p-2"
              onClick={() => alert("caracteristica en desarrollo 🚧")}
            >
              <span className="flex gap-4 items-center">Editar datos</span>
            </button>
            <button className="border border-gray-800 p-4 rounded-br-xl" onClick={logout}>
              <span className="flex gap-4 items-center">Logout</span>
            </button>
          </menu>
        </div>
      </div>
      <div className="w-full md:max-w-full lg:max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-auto">
        <header className="flex justify-between items-center p-4 bg-gray-100">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Carrito</h5>
          <div>
            <Link href="/carrito" className="text-blue-500 hover:text-blue-700">
              Ir a carrito <span className="pi pi-shopping-cart" />
            </Link>
          </div>
        </header>
        <div className="flow-root overflow-x-auto">
          <div className="h-52 overflow-x-auto w-full max-w-xl">
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
      <div className="w-full md:max-w-full lg:max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 m-auto">
        <header className="flex justify-between items-center p-4 bg-gray-100">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Ordenes</h5>
          <div>
            {/* <Link href="/carrito" className="text-blue-500 hover:text-blue-700">Ir a carrito <span className="pi pi-shopping-cart" /></Link> */}
          </div>
        </header>
        <div className="flow-root overflow-x-auto">
          <div className="h-52 overflow-x-auto w-full max-w-xl">
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
  
  )
};

interface OrderItemProps {
  item: IOrderItem
}

const OrderItem = (props: OrderItemProps) => (
  <section className="flex flex-col p-4 border border-gray-300 rounded-md">
    <h5>id: {props.item.id}</h5>
    <article>
      <h6>Productos</h6>
      <DataScroller
        value={props.item.products}
        itemTemplate={() => (<p>item</p>)} rows={5}
        emptyMessage="vista no disponible"
        inline
        scrollHeight="100%" />
    </article>
  </section>
)

export default Profile;
