import Loader from "@components/common/Loader";
import ContentMain from "@components/layout/contentMain";
import EmptyProduct from "@components/layout/product/emptyProduct";
import ProductGridList from "@components/layout/product/productGridList";
import { ApiProductsResponse } from "@interfaces/hidraApi/products";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";
import PaginationMenu from "./paginationButtons";
import SearchBar from "@components/common/searchbar";

interface PaginatedViewProps {
    title: string;
    apiEndpoint: string;
}

const fetcher = async (url: string): Promise<ApiProductsResponse> => {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) throw new Error("Error al cargar productos");
    return data;
}

const PaginatedView = (props: PaginatedViewProps) => {
    const router = useRouter();
    const page = parseInt(router.query.page as string) || 1;
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    }, [currentPage, page]);

    const urlApi = `${props.apiEndpoint}?page=${currentPage}`;
    const { data, error, isLoading } = useSWR(urlApi, fetcher);

    const nextPage = useCallback(() => {
        if (data?.next) {
            const urlObj = new URL(data.next);
            const nextPage = parseInt(urlObj.searchParams.get('page') || "1");
            setCurrentPage(nextPage);
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: nextPage },
            }, undefined, { shallow: true });
        }
    }, [data, router]);

    const prevPage = useCallback(() => {
        if (data?.previous) {
            const urlObj = new URL(data.previous);
            const prevPage = parseInt(urlObj.searchParams.get('page') || "1");
            setCurrentPage(prevPage);
            router.push({
                pathname: router.pathname,
                query: { ...router.query, page: prevPage },
            }, undefined, { shallow: true });
        }
    }, [data, router]);

    return (
        <ContentMain title={props.title} >
            {error && <EmptyProduct />}
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <SearchBar />
                    <ProductGridList products={data?.results ?? []} />
                    <div className="flex justify-center my-4">
                        <PaginationMenu
                            hasPrevious={!!data?.previous}
                            hasNext={!!data?.next}
                            onPrevius={prevPage}
                            onNext={nextPage}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            )}
        </ContentMain>
    )
}

export default PaginatedView;
