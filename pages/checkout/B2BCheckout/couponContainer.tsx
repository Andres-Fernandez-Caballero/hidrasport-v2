import React from 'react';

const CouponContainer = () => {
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">¿Tenés un voucher?</h1>
      <input
        type="text"
        name="coupon"
        placeholder="Ingresa tu cupón"
        className="w-full p-3 border border-gray-300 rounded"
        onChange={(e) => console.log(e.target.value)}
      />
      <div id="coupon-error-msg" className="mt-2 text-red-500 text-sm hidden"></div>
    </div>
  );
};

export default CouponContainer;
