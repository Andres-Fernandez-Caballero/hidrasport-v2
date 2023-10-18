import FlatList from "@components/FlatList";
import CardData from "@components/cardProfile";
import CartItemCard from "@components/cart/CartItemCard";
import { useAuthStore } from "@store/auth.store";
import useCartStore from "@store/useCartStore";
import { useEffect, useState } from "react";
import { IoPencil } from "react-icons/io5";

const Profile = () => {
  const { userSession } = useAuthStore();
  const [pedidos, setPedidos] = useState([]);
  const { cartIsLoading, cartData } = useCartStore();

  function actualizarPedidos() {
    setPedidos([]);
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
      <section className="grid grid-cols-2 grid-rows-2 gap-4">
        <article className="row-span-2">
          <div className="w-full">
            <CardData title={"Informacion de la cuenta"}>
              <article>
                <blockquote>
                  <p className="text-zinc-950 text-md leading-6 font-bold">
                    Usuario:{" "}
                    <span className="font-normal italic">
                      {userSession.username}
                    </span>
                  </p>
                  <p className="text-zinc-950 text-md leading-6 font-bold">
                    Email:{" "}
                    <span className="font-normal italic">
                      {userSession.email}
                    </span>
                  </p>
                </blockquote>
                <menu className="grid mt-4">
                  <button
                    className="flex  justify-center bg-blue-900 text-white border border-black rounded-md p-2"
                    onClick={() => alert("caracteristica en desarrollo 🚧")}
                  >
                    <span className="flex gap-4 items-center">
                      Editar datos <IoPencil />
                    </span>
                  </button>
                </menu>
              </article>
            </CardData>
          </div>
          <div className="w-full">
            <CardData title={"Mis Pedidos"}>
              <article className="">
                <FlatList
                  data={pedidos}
                  keyExtractor={(item) => item}
                  renderItem={(item) => <p>{item}</p>}
                  renderEmptyList={() => <p>Aun no hay pedidos 🫢</p>}
                />
              </article>
            </CardData>
          </div>
        </article>
        <article className="row-span-2">
          <div className="w-full">
            {cartIsLoading ? (
              <p>Cargando...</p>
            ) : (
              <CardData title={"Carrito"}>
                <FlatList
                  data={cartData}
                  keyExtractor={(item) => item.size_id.toString()}
                  renderItem={(item) => <CartItemCard item={item} />}
                  renderEmptyList={() => <p>No hay productos en el carrito</p>}
                />
              </CardData>
            )}
          </div>
        </article>
      </section>
    </main>
  );
};

export default Profile;
