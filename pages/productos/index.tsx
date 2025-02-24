import PaginatedView from "@components/layout/PaginatedView";

const ProductsPage = () => (
  <PaginatedView 
    key="all"
    title="Todos nuestros Productos" 
    initFilters={{}}
  />
)

export default ProductsPage;