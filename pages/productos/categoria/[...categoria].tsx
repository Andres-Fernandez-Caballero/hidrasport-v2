import PaginatedView from "@components/layout/PaginatedView";
import { useRouter } from "next/router";

const ProductCategoryPage: React.FC = () => {
  const router = useRouter()
  const {categoria} = router.query;

  const categories = categoria as string[];
  console.log(categories);
  return (
    <PaginatedView
        key={categories?.toString()}
        title={categories? categories[0] : "Categorias"}
        initFilters={{categories: categoria as string[]}}
    />
)
}
export default ProductCategoryPage;