import Link from "next/link";

const CartEmptyLayout = () => (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
       <i className="text-7xl fa-solid fa-cart-shopping text-gray-800       "></i>
        <h2 className="mt-8 text-2xl font-semibold text-gray-900">Tu carrito está vacío</h2>
        <p className="mt-2 text-lg text-gray-700">Parece que aún no has añadido ningún artículo a tu carrito.</p>
        <Link href="/productos" >Conoce nuestros productos</Link>

    </div>
)

export default CartEmptyLayout;