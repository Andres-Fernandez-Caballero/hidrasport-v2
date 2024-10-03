import PaginatedView from "@components/layout/PaginatedView";

const ProductsPage = () => (
  <>
    <PaginatedView 
      title="Todos nuestros Productos" 
      apiEndpoint={`/api/products`} />
  </>
  )

export default ProductsPage;