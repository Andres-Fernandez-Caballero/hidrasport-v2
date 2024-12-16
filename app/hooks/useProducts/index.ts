import urls from "@config/urls";
import { ApiProductsResponse } from "@interfaces/hidraApi/products";
import { Product } from "@interfaces/IProduct";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { InitFiltersProps } from "./contracts";
import fetcher from "./fetcher";


const useProducts = (initFilters: InitFiltersProps | undefined = undefined) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);    
    const [error, setError] = useState<string | undefined>();
    const [pageData, setPageData] = useState<ApiProductsResponse>();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<InitFiltersProps | undefined>(initFilters);

    // Efecto para escuchar cambios en la query y actualizar filtros
    useEffect(() => {
        const { filters, page } = router.query;

        if (filters) {
            const parsedFilters = JSON.parse(filters as string);
            setFilters(parsedFilters);
        }

        if (page) {
            setCurrentPage(parseInt(page as string));
        }
    }, [router.query]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const url = filters
                    ? `${urls.products}filter/?page=${currentPage}`
                    : `${urls.products}?page=${currentPage}`;
                const method = filters ? 'POST' : 'GET';

                const data = await fetcher(url, method, filters);
                data.results = data.results.filter(product => product !== null);

                setPageData(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [currentPage, filters]);

    function addFilter(filter: InitFiltersProps) {
        setFilters({
            ...filters,
            ...filter,
        });
        router.push({
            pathname: router.pathname,
            query: { ...router.query, filters: JSON.stringify({ ...filters, ...filter }) },
        }, undefined, { shallow: true });
    }

    function clearFilters() {
        setFilters(undefined);
        router.push({
            pathname: router.pathname,
            query: {},
        }, undefined, { shallow: true });
    }

    const hasNextPage = useCallback(() => !!pageData?.next, [pageData]);
    const hasPreviousPage = useCallback(() => !!pageData?.previous, [pageData]);

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
    }, [pageData, router]);

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
    }, [pageData, router]);

    return { 
        products: pageData?.results ?? [] as Product[], 
        countProducts: pageData?.count ?? 0,
        isLoading, 
        error, 
        currentPage, 
        nextPage, 
        hasNextPage,
        prevPage,
        hasPreviousPage,
        clearFilters,
        addFilter,
    };
};


 export default useProducts;