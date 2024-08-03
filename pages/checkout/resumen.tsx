import Link from "next/link";

export default function ResumenPage() {
    return (
        <div className="w-full h-[80vh] flex items-center justify-center flex-col">
            <section className="bg-green-300 p-4 rounded-md mx-4">
                <h2 className="text-lg font-bold mb-2">
                    ¡Tu compra fue confirmada!
                </h2>
                <p>
                    ¡Gracias por tu compra en Hidra! Queremos informarte que hemos recibido tu pedido y estamos procesándolo. Dentro de las próximas 24 horas hábiles, recibirás en tu correo electrónico la información detallada sobre el envío de tu compra. Estamos comprometidos en brindarte un excelente servicio y asegurarnos de que recibas tu pedido en tiempo y forma. Si tienes alguna pregunta o inquietud, no dudes en contactarnos. ¡Pronto podrás disfrutar de tu indumentaria Hidra!
                </p>
            </section>

            <Link className="mt-4 text-blue-600" href={'/'}>Volver al inicio</Link>
        </div>

    )
}