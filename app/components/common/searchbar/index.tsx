import { useState, useEffect, useCallback } from 'react';
import useFetch from 'app/hooks/useFetch';
import urls from '@config/urls';
import { ITitleListResponse, ITitles } from '@interfaces/ITitle';
import router from 'next/router';
import { useSearchBar } from '@store/searchBar.store';

const SearchBar = () => {
  const { hideSearchBar } = useSearchBar();
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
    router.push({
    pathname: "/productos/filter",
    query: { ...router.query, filters: JSON.stringify(filters) },
}, undefined, { shallow: true });
    hideSearchBar();
  };

  return (
    <div className="relative">
    {/* Barra de búsqueda */}
    <div className="fixed top-[56px] left-0 right-0 bg-black p-2 w-full z-20">
      <div className="flex w-full max-w-3xl md:max-w-lg sm:max-w-xs items-center bg-black p-2 rounded-lg mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar..."
          className="flex-grow px-2 py-1 sm:px-1 sm:py-0 border-none rounded-l-lg focus:outline-none bg-gray-900 text-white"
        />
        <button
          className="px-2 py-1 sm:px-1 sm:py-0 text-white hover:bg-white hover:text-black"
          onClick={hideSearchBar}
        >
          <i className="pi pi-times text-sm" aria-hidden="true"></i>
        </button>
        <button
          onClick={handleSearch}
          className={`px-2 py-1 sm:px-1 sm:py-0 rounded-r-lg ${
            buttonDisabled ? 'bg-gray-400 text-gray-200' : 'bg-white hover:bg-blue-700'
          }`}
          disabled={buttonDisabled}
        >
          <i className="pi pi-search text-sm" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <div className='absolute top-28 left-1/2 transform -translate-x-1/2 w-full max-w-3xl rounded-lg bg-white shadow-lg z-10'>
          <ResultSearchBar loading={loading} results={results} error={error} handleTitleClick={handleTitleClick} />
    </div>
  </div>
  );
};


interface ResultSearchBarProps {
  loading: boolean;
  results: ITitles[];
  error: Error | null;
  handleTitleClick: (id: number) => void;
}

const ResultSearchBar = ({ loading, results, error, handleTitleClick }: ResultSearchBarProps) => (
  <>
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
  </>
)



export default SearchBar;
