import Loader from "@components/common/Loader";
import ContentMain from "@components/layout/contentMain";
import EmptyProduct from "@components/layout/product/emptyProduct";
import ProductGridList from "@components/layout/product/productGridList";
import PaginationMenu from "./paginationButtons";
import useProducts from "app/hooks/useProducts";
import { InitFiltersProps } from "app/hooks/useProducts/contracts";
import ProductFilter from "../Filter";
import { useRouter } from "next/router";

interface PaginatedViewProps {
    title: string;
    initFilters?: InitFiltersProps;
}


const PaginatedView = (props: PaginatedViewProps) => {
   const pageData = useProducts(props.initFilters);
   const router = useRouter();
   const { categoria: queryParamCategory } = router.query;

    if (pageData.error) {
        <ContentMain title={props.title} >
            <EmptyProduct />
        </ContentMain>
    }

    return (
        <ContentMain title={props.title} >
            <ProductFilter 
                currentCategory={queryParamCategory as string}
                addFilter = {pageData.addFilter}
                clearFilters = {pageData.clearFilters}
            />
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
