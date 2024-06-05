import PaginatedView from "@components/PaginatedView";
import { SERVER_URL } from "@config/index";
import { useRouter } from "next/router";

const ProductCategoryPage: React.FC = () => {
  const router = useRouter()

  return (
  <PaginatedView
    title={router.query.categoria as string}
    apiEndpoint={`${SERVER_URL}/api/store/products/`}
  />
)
}
export default ProductCategoryPage;