import urls from '@config/urls';
import { IPaymentResponse } from '@interfaces/Ipayment';
import React from 'react';
import { useAuthStore } from '@store/auth/auth.store';
import { useRouter } from 'next/router';
import useApi from 'app/hooks/useApi';
import { toast } from 'react-toastify';

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
  postal_code: string;
  shipping_type: string;
  coupon?: string;
  profile: Omit<ProfileData, 'mayorista' | 'business'>;
}

interface PaymentButtonProps {
  postal_code: string;
  shipping_type: string;
  coupon: { name?: string };
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  postal_code,
  shipping_type,
  coupon,
}) => {
  const { request, loading } = useApi<PaymentRequestBody, IPaymentResponse>();
  const { userSession } = useAuthStore();
  const profile = userSession.profile;
  const router = useRouter();

  const handlePayment = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { mayorista, business, ...strippedProfile } = profile;

    const body: PaymentRequestBody = {
      postal_code,
      shipping_type,
      profile: strippedProfile,
      ...(coupon?.name ? { coupon: coupon.name } : {}),
    };

    try {
      const response = await request(urls.payment, 'POST', body);

      if (!response?.order_number || response.pickup === undefined) {
        console.error('Invalid response structure', response);
        return;
      }

      const url = `/order-confirmation?orderNumber=${response.order_number}&pickup=${response.pickup}`;
      router.push(url);
    } catch (error) {
      toast.error(`Hubo un error con el pago. ${error}`);
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
