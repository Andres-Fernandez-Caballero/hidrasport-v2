import PaginatedView from "@components/PaginatedView";
import { SERVER_URL } from "@config/index";

const ProductsPage = () => (
  <PaginatedView 
    title="Todos nuestros Productos" 
    apiEndpoint={`${SERVER_URL}/api/store/products/`} />
)

export default ProductsPage;