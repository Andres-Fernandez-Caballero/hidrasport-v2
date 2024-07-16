import { NextPage } from 'next';
import { useState, useEffect } from 'react';
import urls from '../../app/config/urls';
import OrderFilter from '@components/common/filters/OrderFilter';
import OrderCard from '@components/common/cards/orderCard/index';
import { IOrder, IOrderFilter } from '@interfaces/IOrder';
import useFetch from '../../app/hooks/useFetch';
import Pagination from '@components/common/Pagination/Pagination';
import usePermissionLevel from 'app/hooks/usePermissionlevel';
import { useRouter } from 'next/router';

const OrdersPage: NextPage = () => {
  const { response, loading, error, fetchData } = useFetch<IOrderFilter>();
  const { authResponse, authLoading, authError } = usePermissionLevel();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filters, setFilters] = useState<{ status: string; startDate: string; endDate: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (authError || (authResponse && !authResponse.admin))) {
      router.push('/');
    }
  }, [authLoading, authResponse, authError, router]);

  useEffect(() => {
    if (response) {
      setOrders(response.results);
      setTotalPages(response.total_pages);
    }
  }, [response]);

  const handleFilterSubmit = async (filters: { status: string; startDate: string; endDate: string }, page: number = 1) => {
    setFilters(filters);
    const body = {
      status: filters.status,
      startDate: filters.startDate,
      endDate: filters.endDate,
    };
    await fetchData(urls.orders + `?page=${page}`, body);
  };

  const handlePageChange = async (page: number) => {
    if (filters) {
      await handleFilterSubmit(filters, page);
    }
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-4">
      <OrderFilter onSubmit={handleFilterSubmit} />
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      {loading ? (
        <div className='flex justify-center p-5'>
          <div>Esperando...</div>
        </div>
      ) : (
        <div className="mt-4">
          {orders && orders.length > 0 ? (
            <ul>
              {orders.map((order, index) => (
                <OrderCard key={index} order={order} />
              ))}
            </ul>
          ) : (
            <div className='flex justify-center p-5'>
              <p>No hay ordenes</p>
            </div>
          )}
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default OrdersPage;
