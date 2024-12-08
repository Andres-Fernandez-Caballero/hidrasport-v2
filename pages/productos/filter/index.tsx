import { GetServerSidePropsContext } from 'next';
import PaginatedView from "@components/layout/PaginatedView";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { filters } = context.query;
  const parsedFilters = filters ? JSON.parse(filters as string) : {};

  return {
    props: {
      filters: parsedFilters,
    },
  };
};

interface ProductFilterPageProps {
  filters: Record<string, string | string[]>;
}

const ProductFilterPage: React.FC<ProductFilterPageProps> = ({ filters }) => {
  return (
    <PaginatedView
      title="Productos"
      initFilters={filters}
    />
  );
};

export default ProductFilterPage;
