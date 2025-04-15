import { useRouter } from "next/router";

export default function OrderConfirmation() {
  const router = useRouter();
  const { orderNumber, pickup } = router.query;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ¡Tu compra fue confirmada!
        </h1>
        {pickup === "true" ? (
          <>
            <p className="text-gray-600 mb-4">
              Te esperamos en la siguiente dirección: 15 de agosto 1997, Villa Raffo, estamos ubicados a solo una cuadra de Gral. Paz.
            </p>
            <p className="text-gray-600 mb-4">
              El horario de retiros es de lunes a viernes, de 10:00 a 17:00 horas.
            </p>
            <p className="text-gray-600 mb-4">
              Retiras solo con tu número de compra o nombre de usuario.
            </p>
            <p className="text-gray-600">Equipo Hidra</p>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-4">
              ¡Gracias por tu compra en Hidra! Queremos informarte que hemos recibido tu pedido y estamos procesándolo.
            </p>
            <p className="text-gray-600 mb-4">
              Dentro de las próximas 24 horas hábiles, recibirás en tu correo electrónico la información detallada sobre el envío de tu compra.
            </p>
            <p className="text-gray-600 mb-4">
              Estamos comprometidos en brindarte un excelente servicio y asegurarnos de que recibas tu pedido en tiempo y forma.
            </p>
            <p className="text-gray-600">
              Si tienes alguna pregunta o inquietud, no dudes en contactarnos. ¡Pronto podrás disfrutar de tu indumentaria Hidra!
            </p>
          </>
        )}
        <div className="text-gray-800 font-semibold text-lg mt-6">
          <strong>Su número de pedido es:</strong> {orderNumber}
        </div>
      </div>
    </div>
  );
}
