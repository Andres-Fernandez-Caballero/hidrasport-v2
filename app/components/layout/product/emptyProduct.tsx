const EmptyProduct = () => (
  <section className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100">
    <i className="text-7xl fa-solid fa-shirt text-red-400"></i>
    <h2 className="mt-8 text-2xl font-semibold text-gray-900">
      No se encontraron productos
    </h2>
    <p className="mt-2 text-lg text-gray-700">
      Parece que no hay productos con esa descripcion.
    </p>
  </section>
);
export default EmptyProduct;
