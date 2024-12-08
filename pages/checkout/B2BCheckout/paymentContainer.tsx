import { ICouponResponse } from '@interfaces/Ipayment';
import React from 'react';

interface PaymentContainerProps {
  productsCost: number;
  shippingCost: number;
  coupon?: ICouponResponse;
}

const PaymentContainer: React.FC<PaymentContainerProps> = ({ productsCost, shippingCost, coupon }) => {
  const newPrice: number = coupon && coupon.value > 0 && productsCost > coupon.min_purchase_value
  ? parseFloat(Math.max((productsCost - coupon.value), coupon.min_purchase_value).toFixed(2))
  : productsCost;

  const totalCost: number = parseFloat((newPrice + shippingCost).toFixed(2));

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Pago por transferencia</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-lg">Costo de productos:</span>
          {coupon && coupon.value > 0 && productsCost > coupon.min_purchase_value ? (
            <span className="text-lg font-semibold line-through text-gray-500">
              ${productsCost.toFixed(2)}
            </span>
          ) : (
            <span className="text-lg font-semibold">${productsCost.toFixed(2)}</span>
          )}
          {coupon && coupon.value > 0 && productsCost > coupon.min_purchase_value && (
            <span className="text-lg font-semibold text-green-600 ml-2">
              ${newPrice}
            </span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-lg">Costo de envio:</span>
          <span className="text-lg font-semibold">${shippingCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg">Total general:</span>
          <span className="text-lg font-semibold">${totalCost}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentContainer;
