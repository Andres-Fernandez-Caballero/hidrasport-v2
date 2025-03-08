import { NextPage } from 'next';
import { useState } from 'react';
import urls from '../../../app/config/urls';
import OrderFilter from '@components/common/filters/OrderFilter';
import OrderCard from '@components/common/cards/orderCard/index';
import { IOrder, IOrderFilter, IOrderFilterRequest } from '@interfaces/IOrder';
import useFetch from '../../../app/hooks/useFetch';
import Pagination from '@components/common/Pagination/Pagination';
import withAdmin from '@components/common/hoc/withAdmin/withAdmin';

const OrdersPage: NextPage = () => {
  const { request, loading, error } = useFetch<IOrderFilterRequest, IOrderFilter>();
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [filters, setFilters] = useState<{ status: string; startDate: string; endDate: string } | null>(null);

  const handleFilterSubmit = async (filters: { status: string; startDate: string; endDate: string }, page: number = 1) => {
    setFilters(filters);

    const body: IOrderFilterRequest = {
      status: filters.status,
      startDate: filters.startDate,
      endDate: filters.endDate,
    };

    const data = await request(urls.orders + `?page=${page}`, 'POST', body);
    setOrders(data.results);
    setTotalPages(data.total_pages);
  };

  const handlePageChange = async (page: number) => {
    if (filters) {
      await handleFilterSubmit(filters, page);
    }
  };

  return (
    <div className="min-h-screen pt-20 p-4">
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

export default withAdmin(OrdersPage);
