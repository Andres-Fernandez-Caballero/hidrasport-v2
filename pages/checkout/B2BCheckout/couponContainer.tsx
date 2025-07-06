import urls from '@config/urls';
import { ICouponResponse } from '@interfaces/Ipayment';
import useApi from 'app/hooks/useApi';
import React, { useState, useEffect, useRef } from 'react';

const debounce = <T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

interface Props {
  setCoupon: React.Dispatch<React.SetStateAction<ICouponResponse | null>>;
}

const CouponContainer = ({ setCoupon }: Props) => {
  const { request } = useApi<null, ICouponResponse>();
  const [error, setError] = useState('');
  const debouncedValidate = useRef<((value: string) => void) | null>(null);

  useEffect(() => {
    debouncedValidate.current = debounce(async (value: string) => {
      setError('');
      try {
        const data = await request(`${urls.validateCoupon}${value}`, 'GET');
        if (!data.detail) {
          setError('The coupon entered is not valid.');
          setCoupon(null);
        } else {
          setCoupon(data);
        }
      } catch (err) {
        setError('El cupón no es válido.');
        setCoupon(null);
      }
    }, 300);
  }, [request, setCoupon]);

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">Do you have a voucher?</h1>
      <input
        type="text"
        name="coupon"
        placeholder="Enter your coupon"
        className="w-full p-3 border border-gray-300 rounded"
        onChange={(e) => debouncedValidate.current?.(e.target.value)}
      />
      {error && (
        <div id="coupon-error-msg" className="mt-2 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};

export default CouponContainer;
