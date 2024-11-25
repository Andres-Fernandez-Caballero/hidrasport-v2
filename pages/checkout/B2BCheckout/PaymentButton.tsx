import urls from '@config/urls';
import { IPaymentResponse } from '@interfaces/Ipayment';
import useFetch from 'app/hooks/useFetch';
import React from 'react';

const PaymentButton = ({ postalCode, coupon, shippingType }) => {
  const { request, loading } = useFetch<IPaymentResponse>();

  const handlePayment = () => {
    const modifiedUrl = `${urls.payment}?postalCode=${postalCode}&coupon=${coupon}&shippingType=${shippingType}`;
    request(modifiedUrl, 'GET');
  };

  return (
    <button
      className="mt-6 w-full p-3 bg-blue-600 text-white font-bold rounded"
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Pagar'}
    </button>
  );
};

export default PaymentButton;
