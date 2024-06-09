import FormCheckout from "./FormCheckout";
import { iCartProduct } from "@interfaces/ICart";
import { DataScroller } from 'primereact/datascroller';
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="divide-y divide-gray-200 dark:divide-gray-700 flow-root overflow-x-auto p-6">
        <DataScroller value={cartData} itemTemplate={(item:iCartProduct) => (<p>{item.name}</p>)} rows={5} inline scrollHeight="500px" header="Deslizá hacia abajo para ver tus productos." />

          <ul className="max-h-24">
           {cartData.map((item,index) => (
           <li key={index} className="py-3 sm:py-4">
           <div className="flex items-center">
               <div className="flex-shrink-0">
               <Image
                 width={100}
                 height={100}
                 src={SERVER_URL + item.img}
                 alt={item.name}
                 className="h-full w-full object-cover object-center"
               />
               </div>
               <div className="flex-1 min-w-0 ms-4">
                   <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                       <b>{item.title}</b>


                   </p>
                   <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                       Color: <b>{item.color}</b> <br/> Talle: <b>{item.size}</b> 
                   </p>
               </div>
               <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
               {item.price}
               </div>
           </div>
       </li>
          ))}
          </ul>
          
        </section>
        <aside className="rounded-sm px-4 py-6 sm:px-6 m-4">
          <FormCheckout />
        </aside>
      </div>
    </main>
  </div>
);

export default CartDetailLayout;
