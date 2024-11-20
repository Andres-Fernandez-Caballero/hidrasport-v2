import React from 'react';

const PaymentContainer = ({ productsCost, shippingCost, total }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Pago por transferencia</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-lg">Costo de productos:</span>
          <span className="text-lg font-semibold">${productsCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg">Costo de envio:</span>
          <span className="text-lg font-semibold">${shippingCost}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-lg">Total general:</span>
          <span className="text-lg font-semibold">${total}</span>
        </div>
      </div>
      <button className="mt-6 w-full p-3 bg-blue-600 text-white font-bold rounded">Pagar</button>
    </div>
  );
};

export default PaymentContainer;
