import React, { useState } from 'react';
import UserData from './userData';
import PaymentContainer from './paymentContainer';
import CouponContainer from './couponContainer';
import PaymentButton from './PaymentButton';
import { ICouponResponse } from '@interfaces/Ipayment';

const B2BCheckout = ({ user, productsCost, shippingCost, postalCode , shippingType}) => {
  const [coupon, setCoupon] = useState<ICouponResponse>({
    detail: "",
    value: 0,
    min_purchase_value: 0,
  });

  return (
    <div className="p-8 bg-gray-100 text-gray-800">
      <UserData user={user} postalCode={postalCode} />
      <PaymentContainer productsCost={productsCost} shippingCost={shippingCost} coupon={coupon} />
      <PaymentButton postalCode={postalCode} coupon={coupon} shippingType={shippingType} />
      <CouponContainer setCoupon={setCoupon} />
    </div>
  );
};

export default B2BCheckout;
