import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import useFetch from 'app/hooks/useFetch';
import { IPublicCartList, IPublicCart } from '@interfaces/ICart';
import urls from '@config/urls';
import Pagination from '@components/common/Pagination/Pagination';
import useLoadPublicCart from 'app/hooks/useLoadPublicCart';
import PublicCartCard from '@components/common/cards/publicCartCard';
import usePermissionLevel from 'app/hooks/usePermissionlevel';

const PublicCartsPage: NextPage = () => {
  const { response, loading, error, fetchData } = useFetch<IPublicCartList>();
  const { submitCart } = useLoadPublicCart();
  const [carts, setCarts] = useState<IPublicCart[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [refreshData, setRefreshData] = useState(false);
  const [cartName, setCartName] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const { authResponse } = usePermissionLevel();

  const handleFetchData = async (page: number = 1) => {
    await fetchData(urls.publicCarts + `?page=${page}`, 'GET');
  };

  const handlePageChange = async (page: number) => {
    await handleFetchData(page);
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    if (response) {
      setCarts(response.results);
      setTotalPages(response.total_pages);
    }
  }, [response]);

  useEffect(() => {
    if (refreshData) {
      handleFetchData();
      setRefreshData(false);
    }
  }, [refreshData]);

  const handleSubmitCart = async (updatedCart: IPublicCart) => {
    try {
      await submitCart(updatedCart);
    } catch (error) {
      console.error('Error submitting cart:', error);
      alert(error);
    }
  };

  const handleSaveCurrentCart = async () => {
    try {
      const payload = {
        name: cartName,
        visible: isVisible,
      };
      await fetchData(urls.savePublicCart, 'POST', payload);
      setRefreshData(true);
    } catch (error) {
      console.error('Error saving cart:', error);
      alert(error);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">Carritos Públicos</h1>
      {authResponse?.admin && (
        <div className="flex flex-col items-center mb-4">
          <div className="flex items-center mb-2">
            <input
              type="text"
              placeholder="Nombre del carrito"
              value={cartName}
              onChange={(e) => setCartName(e.target.value)}
              className="border rounded p-2 mr-2"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isVisible}
                onChange={() => setIsVisible(!isVisible)}
                className="mr-1"
              />
              Visible
            </label>
          </div>
          <button 
            onClick={handleSaveCurrentCart} 
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Guardar Carrito Actual
          </button>
        </div>
      )}
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
      {loading ? (
        <div className="flex justify-center p-5">
          <div>Esperando...</div>
        </div>
      ) : (
        <div className="mt-4">
          {carts && carts.length > 0 ? (
            <ul className="space-y-4">
              {carts.map((cart, index) => (
                <PublicCartCard key={index} cart={cart} onSubmit={handleSubmitCart} />
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
