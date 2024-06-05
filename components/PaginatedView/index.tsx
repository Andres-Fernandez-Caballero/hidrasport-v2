import Loader from "@components/Loader";
import ContentMain from "@components/layout/contentMain";
import EmptyProduct from "@components/product/emptyProduct";
import ProductGridList from "@components/product/productGridList";
import { ApiProductsResponse } from "@interfaces/hidraApi/products";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import useSWR from "swr";

interface PaginatedViewProps {
    title: string;
    apiEndpoint: string;
}


const fetcher = async (url: string): Promise<ApiProductsResponse> => {
    const response = await fetch(url);
    const data = await response.json();

    if(!response.ok) throw new Error("Error al cargar productos");
    return data;
}

const PaginatedView = (props: PaginatedViewProps) => {
    console.log('endpoint', props.apiEndpoint);
    
    const router = useRouter();
    const page = parseInt(router.query.page as string) || 1;
    const [currentPage, setCurrentPage] = useState(page);

    const urlApi = `${props.apiEndpoint}?page=${currentPage}`;
    const { data, error, isLoading } = useSWR(urlApi, fetcher);

    const nextPage = useCallback(() => {
        if(data?.next ){
            const urlObj = new URL(data.next);
            const nextPage = parseInt(urlObj.searchParams.get('page') || "1");
            setCurrentPage(nextPage);
            router.push(`?page=${nextPage}`, undefined, {shallow: true});
        }
    }, [data, router]);

    const prevPage = useCallback(() => {
        if(data?.previous ){
            const urlObj = new URL(data.previous);
            const prevPage = parseInt(urlObj.searchParams.get('page') || "1");
            setCurrentPage(prevPage);
            router.push(`?page=${prevPage}`, undefined, {shallow: true});
        }
    }, [data, router]);

    return (
        <ContentMain title={props.title} >
            {error && <EmptyProduct />}
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <ProductGridList products={data?.results ?? []} />
                    <menu>
                        {data?.previous &&  <button onClick={ prevPage } >PREV</button> }
                        <p>{page}</p>
                        {data?.next &&  <button onClick={ nextPage } >NEXT</button> }
                    </menu>
                </div>
            )}
        </ContentMain>
    )
}

export default PaginatedView;