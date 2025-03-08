import urls from '@config/urls';
import { IPaymentResponse } from '@interfaces/Ipayment';
import useFetch from 'app/hooks/useFetch';
import React from 'react';
import { useAuthStore } from '@store/auth/auth.store';
import { useRouter } from 'next/router';

interface ProfileData {
  address: string;
  street_number: number;
  PC: number;
  telephone: number | null;
  depto: string;
  province: string;
  city: string;
  neighbourhood: string;
  mayorista: boolean;
  business: boolean;
}

interface PaymentRequestBody {
  postalCode: string;
  shippingType: string;
  coupon?: string;
  profile: ProfileData;
}

interface PaymentButtonProps {
  postalCode: string;
  shippingType: string;
  coupon: { name?: string };
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  postalCode,
  shippingType,
  coupon,
}) => {
  const { request, loading } = useFetch<PaymentRequestBody, IPaymentResponse>();
  const { userSession } = useAuthStore();
  const profile = userSession.profile;
  const router = useRouter();

  const handlePayment = async () => {
    const body: PaymentRequestBody = {
      postalCode,
      shippingType,
      profile,
      ...(coupon?.name ? { coupon: coupon.name } : {}),
    };

    try {
      const response = await request(urls.payment, 'POST', body);
      console.log("Payment response:", response);

        router.push({
          pathname: '/orderConfirmation',
          query: {
            orderNumber: response.orderNumber,
            pickup: response.pickup.toString(),
          },
        });
      
    } catch (error) {
      console.error("Error processing payment:", error);
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
