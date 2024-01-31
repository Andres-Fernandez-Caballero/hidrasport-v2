const Checkout = () => {
  return (
    <section className="card border shadow p-4">
      <form className="grid grid-cols-1 md:grid-cols-3">
        <article>
          <h2>Datos de envio</h2>
          <input type="text" placeholder="Calle" />
          <input type="number" placeholder="Numero" />
          <input type="text" placeholder="Depto" />
          <input type="text" placeholder="Barrio" />
          <input type="text" placeholder="Codigo Postal" />
          <input type="text" placeholder="Ciudad" />
          <input type="text" placeholder="Provincia" />
        </article>
        <article>
          <h2>Datos de tarjeta</h2>
          <input type="number" placeholder="Calle" />
          <input type="date" placeholder="Numero" />
          <input type="number" placeholder="Depto" />
          <input type="text" placeholder="Barrio" />
          <input type="text" placeholder="Codigo Postal" />
          <input type="number" placeholder="Ciudad" />
          <input type="number" placeholder="Provincia" />
        </article>
        <article>
          <h2>Resumen de compra</h2>
          <p>Subtotal</p>
          <p>Envio</p>
          <p>Total</p>
          <button>Comprar</button>
        </article>
      </form>
    </section>
  );
};

export default Checkout;
