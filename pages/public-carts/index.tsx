import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import useFetch from 'app/hooks/useFetch';
import { IPublicCartList, IPublicCart } from '@interfaces/ICart';
import urls from '@config/urls';
import Pagination from '@components/common/Pagination/Pagination';
import useLoadPublicCart from 'app/hooks/useLoadPublicCart';
import PublicCartCard from '@components/common/cards/publicCartCard';

const PublicCartsPage: NextPage = () => {
  const { response, loading, error, fetchData } = useFetch<IPublicCartList>();
  const { submitCart } = useLoadPublicCart();
  const [carts, setCarts] = useState<IPublicCart[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleFetchData = async (page: number = 1) => {
    await fetchData(urls.publicCarts + `?page=${page}`, 'GET');
  };

  const handlePageChange = async (page: number) => {
    await handleFetchData(page);
  };

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (response) {
      setCarts(response.results);
      setTotalPages(response.total_pages);
    }
  }, [response]);

  const handleSubmitCart = async (cart: IPublicCart) => {
    try {
      await submitCart(cart);
    } catch (error) {
      console.error('Error submitting cart:', error);
      alert(error);
    }
  };
  

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-2xl font-bold mb-4">Carritos Públicos</h1>
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      {loading ? (
        <div className="flex justify-center p-5">
          <div>Esperando...</div>
        </div>
      ) : (
        <div className="mt-4">
          {carts.length > 0 ? (
            <ul className="space-y-4">
              {carts.map((cart, index) => (
                <PublicCartCard key={index} cart={cart} onSubmit={() => handleSubmitCart(cart)} />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center p-5">
              <p>No hay carritos</p>
            </div>
          )}
        </div>
      )}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default PublicCartsPage;
