import { useState, useEffect, useCallback } from 'react';
import useFetch from 'app/hooks/useApi';
import urls from '@config/urls';
import { ITitleListResponse, ITitles } from '@interfaces/ITitle';
import router from 'next/router';
import { useSearchBar } from '@store/searchBar.store';

const SearchBar = () => {
  const { hideSearchBar, searchBarIsOpen } = useSearchBar();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<ITitles[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const { request, loading, error,} = useFetch<null, ITitleListResponse>();

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
    const data = await request(`${urls.titlesFilter}?q=${encodeURIComponent(debouncedQuery)}`, 'GET' );
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
    <div className="fixed w-[100%] z-10">
    {/* Barra de búsqueda */}
    <div className={`fixed top-[56px] flex align-middle left-0 right-0 bg-white/30 backdrop-blur-[4px] overflow-y-auto 
            w-full z-20  delay-50 duration-300 ease-in-out transition-all ${
            searchBarIsOpen ? 'h-14 p-2' : 'delay-300 h-0 p-0'
          }`}>
      <div className={`flex w-full max-w-3xl md:max-w-lg sm:max-w-xs overflow-y-hidden items-center bg-gray-300 
            py-1 px-2 rounded-3xl mx-auto duration-300 ease-in-out transition-all
            ${searchBarIsOpen ? 'opacity-100 delay-300' : 'opacity-0 p-0 m-0 delay-0'}`}>
      <button
          className={`px-2 py-1 sm:px-1 sm:py-0 rounded-xl mr-1 ${
            buttonDisabled ? 'bg-gray-400 text-gray-200' : 'bg-white hover:bg-blue-700'
          }`}
          disabled={buttonDisabled}
        >
          <i className="pi pi-search text-sm" aria-hidden="true"></i>
        </button>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar..."
          className="flex-grow px-2 py-1 sm:px-1 sm:py-0 border-none rounded-l-lg focus:outline-none bg-gray-900 text-white"
        />
        <button
          className="w-9 sm:px-1 sm:py-0 text-white rounded-r-xl transition delay-0 duration-300 ease-in-out hover:bg-rose-300"
          onClick={hideSearchBar}
        >
          <i className="pi pi-times text-sm" aria-hidden="true"></i>
        </button>
        
      </div>
    </div>
      <div className='absolute mt-28 left-1/2 transform -translate-x-1/2 w-full max-w-3xl rounded-lg bg-white shadow-lg z-10'>
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

const ResultSearchBar = ({ loading, results, error, handleTitleClick }: ResultSearchBarProps) => {
  const { searchBarIsOpen } = useSearchBar();
  return(
    <div className="backdrop-blur-xl">
    {loading && <div className='flex align-middle justify-center'>
                  <i className='pi pi-spinner pi-spin text-[2.5rem] m-4 text-gray-500'/>
                </div>
      }
      {error && <p className="text-red-500 mt-20">Error fetching data: {error.message}</p>}
      { searchBarIsOpen && results.length > 0 && !loading && !error && (
        <ul className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-3xl border rounded-lg bg-white/90  shadow-lg z-10">
          {results.map((item) => (
            <li
            key={item.id}
            onClick={() => handleTitleClick(item.id)}
              className="px-4 py-2 cursor-pointer rounded-md text-black
              transition-all duration-300 ease-in-out hover:text-white hover:bg-black/70 hover:font-extrabold"
              >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}



export default SearchBar;
