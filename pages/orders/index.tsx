import { NextPage } from 'next';
import { useState } from 'react';
import urls from '../../app/config/urls';
import OrderFilter from '@components/common/filters/OrderFilter';
import { IOrder } from '@interfaces/IOrder';
import OrderCard from '@components/common/cards/orderCard/index';
import { useAuthStore } from "@store/auth/auth.store";


const OrdersPage: NextPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { userSession } = useAuthStore();
  const token = userSession?.token;

  const handleFilterSubmit = async (filters: { status: string; startDate: string; endDate: string }) => {
    setLoading(true);

    try {
      const response = await fetch(urls.orders, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(filters),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.results);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen p-4">
      <OrderFilter onSubmit={handleFilterSubmit} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-4">
          {orders && orders.length > 0 ? (
            <ul>
              {orders.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))}
            </ul>
          ) : (
            <p>No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
