import PaginatedView from "@components/layout/PaginatedView";
import { useRouter } from "next/router";

const ProductCategoryPage: React.FC = () => {
  const router = useRouter()
  const {categoria} = router.query;

  console.log(categoria);
  
  return (
    <PaginatedView
      title={router.query.categoria as string}
      initFilters={{categories: [categoria]}}
    />
)
}
export default ProductCategoryPage;