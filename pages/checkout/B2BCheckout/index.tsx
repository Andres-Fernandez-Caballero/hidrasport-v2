import React from 'react';
import UserData from './userData';
import PaymentContainer from './paymentContainer';
import CouponContainer from './couponContainer';

const B2BCheckout = ({ user, productsCost, shippingCost, total, postalCode }) => {
  console.log(user)
  return (
    <div className="p-8 bg-gray-100 text-gray-800">
      <UserData user={user} postalCode={postalCode} />
      <PaymentContainer productsCost={productsCost} shippingCost={shippingCost} total={total} />
      <CouponContainer />
    </div>
  );
};

export default B2BCheckout;
