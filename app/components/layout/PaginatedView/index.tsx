import Loader from "@components/common/Loader";
import ContentMain from "@components/layout/contentMain";
import EmptyProduct from "@components/layout/product/emptyProduct";
import ProductGridList from "@components/layout/product/productGridList";
import PaginationMenu from "./paginationButtons";
import useProducts, { InitFiltersProps } from "app/hooks/useProducts";

interface PaginatedViewProps {
    title: string;
    initFilters?: InitFiltersProps;
}


const PaginatedView = (props: PaginatedViewProps) => {
   const pageData = useProducts(props.initFilters);
    
    if (pageData.error) {
        <ContentMain title={props.title} >
            <EmptyProduct />
        </ContentMain>
    }

    return (
        <ContentMain title={props.title} >
            {pageData.isLoading ? (
                <Loader />
            ) : (
                <div>
                    <ProductGridList products={pageData.products} />
                    <div className="flex justify-center my-4">
                        <PaginationMenu
                            hasPrevious={pageData.hasPreviousPage()}
                            hasNext={pageData.hasNextPage()}
                            onPrevius={pageData.prevPage}
                            onNext={pageData.nextPage}
                            currentPage={pageData.currentPage}
                        />
                    </div>
                </div>
            )}
        </ContentMain>
    )
}

export default PaginatedView;
