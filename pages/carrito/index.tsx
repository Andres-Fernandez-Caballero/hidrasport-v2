import Image from "next/image";
import { SERVER_URL } from "@config/index";
import useCartStore from "@store/useCartStore";
import { useRouter } from "next/router";
export interface CartProps {
  cart: unknown;
}

const Cart = () => {
  const { cartData } = useCartStore();
  const subTotal = cartData.reduce(
    (currentValue, item) => currentValue + item.price,
    0,
  );
  const router = useRouter();
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Carrito 🛒
        </h2>
        {/* contenido */}
        <section className="">
          {cartData.map((item) => (
            <article key={item.size_id}>
              <h3 className="sr-only">item-detail</h3>
              <figure className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-md border p-2 border-gray-200">
                <Image
                  width={600}
                  height={600}
                  src={SERVER_URL + item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center"
                />
              </figure>

              <div className="ml-4 flex flex-1 flex-col">
                <header className="flex justify-between text-base font-medium text-gray-900">
                  <h4>
                    <a href="#">{item.name}</a>
                  </h4>
                  <p className="ml-4">${item.price}</p>
                </header>
                <blockquote className="flex ">
                  <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                  <p className="mt-1 text-sm text-gray-500 mx-2">|</p>
                  <p className="mt-1 text-sm text-gray-500">{item.size}</p>
                </blockquote>

                <aside className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Cantidad {item.quantity}</p>

                  <menu className="flex">
                    <button
                      type="button"
                      className="font-medium text-red-500 hover:text-red-700"
                    >
                      Eliminar
                    </button>
                  </menu>
                </aside>
              </div>
            </article>
          ))}
        </section>
        <section className="rounded-sm px-4 py-6 sm:px-6 m-4">
          <header className="flex justify-between text-base font-medium text-gray-900">
            <h3>Subtotal</h3>
            <p>${subTotal}</p>
          </header>
          <nav className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Comprar
            </a>
          </nav>
          <nav className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or&nbsp;
              <button
                onClick={() => {
                  router.push("/");
                }}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continua Comprando 🏊
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default Cart;
