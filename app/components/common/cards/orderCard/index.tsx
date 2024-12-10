import React, { useState } from 'react';
import { IOrder } from '@interfaces/IOrder';
import Image from "next/image";
import { SERVER_URL } from '@config/index';

interface OrderCardProps {
  order: IOrder;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
    return (
      <div className='w-4/5 mx-auto m-4'>
        <div className='flex justify-between mx-auto'>
          <h2 className="text-xl font-bold mb-2">Nº: {order.id}</h2>
          <p className="text-gray-600 mb-4">Fecha: {order.timestamp}</p>
        </div>
        <div className="border rounded-lg p-4 mx-auto shadow-lg">
          <div className='flex justify-around pb-4 border-b-2 border-gray-300'>
            <div>{order.status}</div>
            <div>
              <div>Procesar</div>
              <div>Cancelar</div>
            </div>
          </div>
          <div className='flex justify-between pt-4 pb-4 border-b-2 border-gray-300'>
            <div>Cliente: {order.user}</div>
            <div >
              <div>Cupón: {order.coupon}</div>
              <div>Cupón valor ${order.coupon_value}</div>
              <div>Cantidad: {order.products.length}</div>
            </div>
            <div>
              <div>Monto: ${order.total_cost}</div>
              <div>Productos: ${order.products_cost}</div>
              <div>Envio: ${order.delivery_cost}</div>
            </div>
            <div>
              <div>Precio dolar blue: ${order.dolar_price}</div>
              <div>Tipo de venta: {order.user_type}</div>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
              onClick={toggleExpand}
              >
              {isExpanded ? '-' : '+'}
            </button>
          </div>
          <div className="flex">
              {isExpanded ? 
                <ul className='w-full'>
                    {order.products.map((product, index) => (
                      <div className='flex items-center justify-around' key={index}>
                        <div>
                          <Image
                            src={SERVER_URL+"/"+product.img_front}
                            alt={product.title}
                            width={300}
                            height={200}
                            className="rounded-sm max-h-48"
                          />
                        </div>
                        <div>
                          <div>{product.title}</div>
                          <div>{product.subcode}</div>
                        </div>
                        <div>
                          <div>{product.color}</div>
                          <div>{product.size}</div>                          
                        </div>
                        <div>
                          <div>Cantidad: {product.cantidad}</div>
                          <div>Precio de venta ${product.sale_price}</div>
                          <div>Precio de venta en usd ${product.usd_sale_price}</div>
                          <div>Precio ${product.price}</div>
                          <div>Precio mayorista ${product.b2b_price}</div>
                        </div>
                      </div>
                    ))}
                </ul> :<div></div>
              }
          </div>
        </div>
      </div>
    );
}

export default OrderCard;
