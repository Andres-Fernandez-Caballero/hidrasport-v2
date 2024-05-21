import FlatList from "@components/FlatList";
import CartItemCard from "@components/cart/CartItemCard";
import { useAuthStore } from "@store/auth.store";
import useCartStore from "@store/cart/useCartStore";
import { useEffect } from "react";
import { IoPencil } from "react-icons/io5";


const Profile = () => {
  const { userSession } = useAuthStore();
  const {  cartData } = useCartStore();

  function actualizarPedidos() {
    // setPedidos([]);
  }

  useEffect(() => {
    actualizarPedidos();
  }, []);

  return (
    <main className="container mx-auto">
      <header>
        <h1 className="text-gray-700 font-bold text-4xl leading-10 text-justify px-12 py-6">
          Perfil de usuario
        </h1>
      </header>
      <section>
        <div className="flex justify-center space-x-4 m-5">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center p-10">
                  <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/images/avatar.jpg" alt="Avatar del usuario logueado"/>
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userSession.username}</h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{userSession.email}</span>
                  <div className="flex mt-4 md:mt-6">
                  <button
                    className="flex  justify-center bg-blue-900 text-white border border-black rounded-md p-2"
                    onClick={() => alert("caracteristica en desarrollo 🚧")}
                  >
                    <span className="flex gap-4 items-center">
                      Editar datos <IoPencil />
                    </span>
                  </button>
                  </div>
              </div>
          </div>
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Carrito</h5>
            </div>
            <div className="flow-root overflow-x-auto">
              <div className="h-52 overflow-x-auto w-full max-w-xl">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                  <FlatList
                    data={cartData}
                    direction="vertical"
                    keyExtractor={(item) => item.name}
                    renderItem={(item) => <CartItemCard item={item} />}
                    renderEmptyList={() => <p>No hay productos en el carrito</p>}
                  />
                </ul>
              </div>
          </div>
        </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
