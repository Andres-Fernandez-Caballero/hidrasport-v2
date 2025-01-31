import PaginatedView from "@components/layout/PaginatedView";
import { useRouter } from "next/router";

const ProductCategoryPage: React.FC = () => {
  const router = useRouter()
  const {categoria} = router.query;
  
  return (
    <PaginatedView
        key={categoria as string}
        title={router.query.categoria as string}
        initFilters={{categories: [categoria]}}
    />
)
}
export default ProductCategoryPage;