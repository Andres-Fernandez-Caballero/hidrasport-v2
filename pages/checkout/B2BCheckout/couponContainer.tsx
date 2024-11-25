import urls from '@config/urls';
import { ICouponResponse } from '@interfaces/Ipayment';
import useFetch from 'app/hooks/useFetch';
import React, { useState, useCallback } from 'react';

const CouponContainer = ({ setCoupon }) => {
  const { request } = useFetch<ICouponResponse>();
  const [error, setError] = useState('');

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleCouponChange = useCallback(
    debounce(async (value) => {
      setError('');
      try {
        const data = await request(`${urls.validateCoupon}${value}`, 'GET') as ICouponResponse;
        if (!data.detail) {
          setError('El cupón ingresado no es válido.');
          setCoupon('');
        } else {
          setCoupon(data);
        }
      } catch (err) {
        console.error('Error validating coupon:', err);
        setError('Hubo un error validando tu cupón. Por favor, intenta de nuevo.');
        setCoupon('');
      }
    }, 300),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">¿Tenés un voucher?</h1>
      <input
        type="text"
        name="coupon"
        placeholder="Ingresa tu cupón"
        className="w-full p-3 border border-gray-300 rounded"
        onChange={(e) => handleCouponChange(e.target.value)}
      />
      {error && <div id="coupon-error-msg" className="mt-2 text-red-500 text-sm">{error}</div>}
    </div>
  );
};

export default CouponContainer;
