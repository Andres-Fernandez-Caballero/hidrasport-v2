import React, { useState } from 'react';
import UserData from './userData';
import PaymentContainer from './paymentContainer';
import CouponContainer from './couponContainer';
import PaymentButton from './PaymentButton';
import { ICouponResponse } from '@interfaces/Ipayment';
import router from 'next/router';

const B2BCheckout = ({ user, productsCost, shippingCost}) => {
  // TODO: user is not used aparently
  console.log(user.email)
  const [coupon, setCoupon] = useState<ICouponResponse>({
    detail: "",
    name: "",
    value: 0,
    min_purchase_value: 0,
  });
  const { postalCode } = router.query;

  const shippingType: string = parseInt(String(postalCode)) > 0 ? "ship_pap" : "pickup";

  return (
    <div className="p-8 bg-gray-100 text-gray-800">
      <UserData postalCode={postalCode} />
      <PaymentContainer productsCost={productsCost} shippingCost={shippingCost} coupon={coupon} />
      <PaymentButton postal_code={postalCode as string} coupon={coupon} shipping_type={shippingType} />
      <CouponContainer setCoupon={setCoupon} />
    </div>
  );
};

export default B2BCheckout;
