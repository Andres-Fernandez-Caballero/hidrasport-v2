import PaginatedView from "@components/layout/PaginatedView";
import { useRouter } from "next/router";

const ProductCategoryPage: React.FC = () => {
  const router = useRouter()
  const {categoria} = router.query;
  
  return (
  <PaginatedView
    title={router.query.categoria as string}
    apiEndpoint={`/api/products/categoria/${categoria}`}
  />
)
}
export default ProductCategoryPage;