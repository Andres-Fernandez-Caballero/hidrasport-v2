import PaginatedView from "@components/layout/PaginatedView";
import { useRouter } from "next/router";

const ProductCategoryPage: React.FC = () => {
  const router = useRouter()
  const {categoria} = router.query;
  
  console.log(categoria);
  
  return (
    <PaginatedView
        key={categoria as string}
        title={(router.query.categoria as string[])[0]}
        initFilters={{categories: categoria as string[]}}
    />
)
}
export default ProductCategoryPage;