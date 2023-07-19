import Image from "next/image";
import { HIDRA_SERVER_URL } from "@config/index";
import axios from "axios";


export async function getStaticProps() {
  const url = HIDRA_SERVER_URL + '/api/sessions/cart/'
  const res = await axios.get(url, {withCredentials: true})
  return {
    props: { cart: res.data },
  };
}

export interface CartProps{
  cart: unknown;
}

const Cart = ({cart}: CartProps) => {
  console.log(cart);
  
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Carrito 🛒
        </h2>
        {/* contenido */}
        <section className="grid grid-cols-2">
          <article>
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                width={600}
                height={600}
                src="/images/remera_frente.png"
                alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href="#">Throwback Hip Bag</a>
                  </h3>
                  <p className="ml-4">$90.00</p>
                </div>
                <blockquote className="flex ">
                <p className="mt-1 text-sm text-gray-500">Salmon</p>
                <p className="mt-1 text-sm text-gray-500 mx-2" >|</p>
                <p className="mt-1 text-sm text-gray-500">XL</p>
                </blockquote>

              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty 1</p>

                <div className="flex">
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </article>
          <aside className="">
          <div className="rounded-sm px-4 py-6 sm:px-6 m-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>

                </div>
            </div>
            
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Cart;
