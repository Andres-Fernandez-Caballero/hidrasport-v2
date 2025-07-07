import React, { useState } from 'react';
import { IOrder, OrderStatus, OrderStatusLabels } from '@interfaces/IOrder';
import Image from 'next/image';
import { SERVER_URL } from '@config/index';
import useApi from 'app/hooks/useApi';
import urls from '@config/urls';
import { toast } from 'react-toastify';

interface OrderCardProps {
  order: IOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded(!isExpanded);
  const [orderStatus, setOrderStatus] = useState(order.status);

  const { request, loading } = useApi<null, { message: string }>();

  const updateOrderStatus = async (orderId: number, action: "process" | "cancel") => {
    try {
      const data = await request(
        `${urls.ordersUpdateStatus}?order_id=${orderId}&action=${action}`,
        "GET"
      );
      toast.success(data.message);

      if (action === "process") setOrderStatus(OrderStatus.COMPLETED);
      if (action === "cancel") setOrderStatus(OrderStatus.CANCELED);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto my-4 px-2">
      <div className="border rounded-lg shadow-lg p-4 bg-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-lg font-semibold">Nº: {order.id}</h2>
          <p className="text-sm text-gray-400">Fecha: {order.timestamp}</p>
        </div>

        <div className="border-b border-gray-300 pb-3 flex flex-col sm:flex-row sm:justify-between gap-4 text-sm">
          <div className="text-blue-600 font-medium">
            {OrderStatusLabels[orderStatus as OrderStatus] ?? orderStatus}
          </div>

          {orderStatus === OrderStatus.PENDING && (
            <div className="flex gap-4 flex-wrap">
              <button
                className="text-blue-600 hover:underline disabled:opacity-50"
                disabled={loading}
                onClick={() => updateOrderStatus(order.id, "process")}
              >
                Procesar
              </button>
              <button
                className="text-red-600 hover:underline disabled:opacity-50"
                disabled={loading}
                onClick={() => updateOrderStatus(order.id, "cancel")}
              >
                Cancelar
              </button>
            </div>
          )}

          <button
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 self-start sm:self-center"
            onClick={toggleExpand}
          >
            {isExpanded ? '− Detalles' : '+ Detalles'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm">
          <div>
            <div><span className="font-medium">Cliente:</span> {order.user}</div>
            <div><span className="font-medium">Dirección:</span> {order.delivery_address}</div>
            <div><span className="font-medium">Provincia:</span> {order.province}</div>
            <div><span className="font-medium">Ciudad:</span> {order.city}</div>
            <div><span className="font-medium">Depto:</span> {order.depto}</div>
          </div>
          <div>
            <div><span className="font-medium">Cupón:</span> {order.coupon}</div>
            <div><span className="font-medium">Valor:</span> ${order.coupon_value}</div>
            <div><span className="font-medium">Cantidad:</span> {order.products.length}</div>
          </div>
          <div>
            <div><span className="font-medium">Total:</span> ${order.total_cost}</div>
            <div><span className="font-medium">Productos:</span> ${order.products_cost}</div>
            <div><span className="font-medium">Envío:</span> ${order.delivery_cost}</div>
          </div>
          <div>
            <div><span className="font-medium">Dólar blue:</span> ${order.dollar_price}</div>
            <div><span className="font-medium">Venta:</span> {order.user_type}</div>
            <div><span className="font-medium">Cliente:</span> {order.client_type_name}</div>
            <div><span className="font-medium">Multiplicador:</span> {order.client_type_multiplier}</div>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 divide-y divide-gray-300">
            {order.products.map((product, index) => (
              <div key={index} className="py-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto items-start px-4">
                  <div className="flex justify-center">
                    <div className="w-24 h-24 relative">
                      <Image
                        src={SERVER_URL + '/' + product.img_front}
                        alt={product.title}
                        fill
                        className="object-contain rounded-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>{product.title}</div>
                    <div>{product.subcode}</div>
                    <div>Color: {product.color}</div>
                    <div>Talle: {product.size}</div>
                    <div>Cantidad: {product.cantidad}</div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>Precio de venta: ${product.sale_price}</div>
                    <div>Precio de venta USD: ${product.usd_sale_price}</div>
                    <div>Precio de producto: ${product.price}</div>
                    <div>Precio mayorista: ${product.b2b_price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
