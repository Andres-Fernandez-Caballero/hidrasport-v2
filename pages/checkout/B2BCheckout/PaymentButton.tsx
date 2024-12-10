import urls from '@config/urls';
import { IPaymentResponse } from '@interfaces/Ipayment';
import useFetch from 'app/hooks/useFetch';
import router from 'next/router';
import React from 'react';

const PaymentButton = ({ postalCode, coupon, shippingType }) => {
  const { request, loading } = useFetch<IPaymentResponse>();

  const handlePayment = async() => {
    let modifiedUrl = `${urls.payment}?postalCode=${postalCode}&shippingType=${shippingType}`;
  
    if (coupon.name) {
      modifiedUrl += `&coupon=${coupon.name}`;
    }
  
    const data = await request(modifiedUrl, 'GET') as IPaymentResponse;
    if (data){
      router.push({
        pathname: "/OrderConfirmation",
        query: { orderNumber: data.orderNumber, pickup: data.pickup },
      });
    }
  };
  

  return (
    <button
      className="mt-6 w-full p-3 bg-blue-600 text-white font-bold rounded"
      onClick={handlePayment}
      disabled={loading}
    >
      {loading ? 'Cargando...' : 'Pagar'}
    </button>
  );
};

export default PaymentButton;
