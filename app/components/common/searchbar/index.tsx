import { useState, useEffect, useCallback } from 'react';
import useFetch from 'app/hooks/useFetch';
import urls from '@config/urls';
import { ITitleListResponse, ITitles } from '@interfaces/ITitle';
import router from 'next/router';

type SearchBarProps = {
  toggleSearchBar: () => void;
};


const SearchBar = ({ toggleSearchBar }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ITitles[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { request, loading, error } = useFetch<ITitleListResponse>();

  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleSearch = useCallback(async () => {
    const data = await request(
      `${urls.titlesFilter}?q=${encodeURIComponent(debouncedQuery)}`,
      'GET'
    ) as ITitleListResponse;
    setResults(data.results);
  }, [debouncedQuery, request]);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      handleSearch();
      setButtonDisabled(false);
    } else {
      setResults([]);
      setButtonDisabled(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const handleTitleClick = async (id: number) => {
    const filters = { "title__id": id };
    toggleSearchBar();
    router.push({
      pathname: "/productos/filter",
      query: { filters: JSON.stringify(filters) },
    });
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 right-0 bg-black p-2 w-full z-20">
        <div className="flex w-full max-w-3xl bg-black p-2 rounded-lg mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar..."
            className="flex-grow px-4 py-2 border-none rounded-l-lg focus:outline-none bg-gray-900 text-white"
          />
          <button
            onClick={handleSearch}
            className={`px-4 py-2 rounded-r-lg ${
              buttonDisabled ? 'bg-gray-400 text-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={buttonDisabled}
          >
            Buscar
          </button>
        </div>
      </div>
      {loading && <p className="text-white mt-20">Loading...</p>}
      {error && <p className="text-red-500 mt-20">Error fetching data: {error.message}</p>}
      {results.length > 0 && (
        <ul className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-3xl border rounded-lg bg-white shadow-lg z-10">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => handleTitleClick(item.id)}
              className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-black"
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
