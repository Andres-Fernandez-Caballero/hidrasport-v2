import urls from '@config/urls';
import { useState, useEffect } from 'react';
import { ITitleListResponse, ITitles } from '@interfaces/ITitle';
import { IProductListResponse } from '@interfaces/IProduct';
import useFetch from 'app/hooks/useFetch';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ITitles[]>([]);
  const { response, loading, error, fetchData } = useFetch<ITitleListResponse>();
  const { response: productResponse, loading: productLoading, error: productError, fetchData: fetchProducts } = useFetch<IProductListResponse>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const fetchTitles = async () => {
      if (searchQuery.length > 3) {
        await fetchData(`${urls.titlesFilter}?q=${encodeURIComponent(searchQuery)}`, 'GET');
      } else {
        setResults([]);
      }
    };

    const debounceFetch = setTimeout(fetchTitles, 300);

    return () => clearTimeout(debounceFetch);
  }, [searchQuery, fetchData]);

  useEffect(() => {
    if (response) {
      setResults(response.results);
    }
  }, [response]);

  const handleTitleClick = async (id: number) => {
    await fetchProducts(urls.productsFilter, 'POST', { "title__id": id });
    console.log(productResponse, productLoading, productError)
  };

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <div className="flex">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Buscar..."
          className="px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600"
        >
          Buscar
        </button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error.message}</p>}
      {results.length > 0 && (
        <ul className="mt-2 w-full border rounded-lg bg-white shadow-lg">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => handleTitleClick(item.id)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
