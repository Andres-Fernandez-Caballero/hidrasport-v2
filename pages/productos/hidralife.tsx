import PaginatedView from "@components/layout/PaginatedView";

const HidraLifePage: React.FC = () => (
  <PaginatedView
    title="Hidra Life 🏊"
    initFilters={{categories: ["Hombre"]}}
  />
)
export default HidraLifePage;