import urls from "@config/urls";
import { ApiProductsResponse } from "@interfaces/hidraApi/products";
import { Product } from "@interfaces/IProduct";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { InitFiltersProps } from "./contracts";
import fetcher from "./fetcher";


const useProducts = (initFilters: InitFiltersProps | undefined = undefined ) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);    
    const [error, setError] = useState<string | undefined>();
    const [pageData, setePageData] = useState<ApiProductsResponse>();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<InitFiltersProps | undefined>(initFilters);

    /* Este useEffect podria eliminarse */
    useEffect(() => {
        setFilters(initFilters);
        setCurrentPage(1);
         // Resetea a la primera página si cambian los filtros
    },
    [initFilters]);
    

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const url = filters ? 
                `${urls.products}filter/?page=${currentPage}` : 
                `${urls.products}?page=${currentPage}`;
                const method = filters ? 'POST' : 'GET';
                            
                const data = await fetcher(url, method, filters);
                data.results = data.results.filter(product => product !== null);

                setePageData(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchData();
    }, [currentPage, filters, router.query]);
    
    function addFilter(filter: InitFiltersProps){
        setFilters({
            ...filters,
            ...filter
        });
    }

    function clearFilters(){
        setFilters(undefined);
    }

    const hasNextPage = useCallback(
        () => (pageData?.next)
        , [pageData]
    );
    
    const hasPreviousPage = useCallback(
        () => (pageData?.previous)
        , [pageData]
    ) 

    const nextPage = useCallback(() => {
        if (pageData?.next) {
            const urlObj = new URL(pageData.next);
            const nextPage = parseInt(urlObj.searchParams.get('page') || "1");
            setCurrentPage(nextPage);
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: nextPage },
            }, undefined, { shallow: true });
        }
        // 
    }, [pageData, router, setCurrentPage]);

    const prevPage = useCallback(() => {
        if (pageData?.previous) {
            const urlObj = new URL(pageData.previous);
            const prevPage = parseInt(urlObj.searchParams.get('page') || "1");
            setCurrentPage(prevPage);
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: prevPage },
            }, undefined, { shallow: true });
        }
    }, [pageData, router, setCurrentPage]);
    
    return { 
        products: pageData?.results ?? [] as Product[], 
        countProucts: pageData?.count ?? 0,
        isLoading, 
        error, 
        currentPage, 
        nextPage, 
        hasNextPage,
        prevPage,
        hasPreviousPage,
        clearFilters,
        addFilter
    };
 }

 export default useProducts;