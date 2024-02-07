import FormCheckout from "@components/formCheckout";
import { iCartProduct } from "@interfaces/ICart";
import Image from "next/image";
import { SERVER_URL } from "@config/index";

interface CartDetailLayoutProps {
  cartData: iCartProduct[];
}

const CartDetailLayout = ({ cartData }: CartDetailLayoutProps) => (
  <div className="bg-white">
    <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 md:max-w-7xl md:px-8">
      <h2 className="sr-only text-2xl font-bold tracking-tight text-gray-900">
        Carrito 🛒
      </h2>
      {/* contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <aside className="rounded-sm px-4 py-6 sm:px-6 m-4">
          <FormCheckout />
        </aside>
      </div>
    </main>
  </div>
);

export default CartDetailLayout;
