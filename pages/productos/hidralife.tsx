import PaginatedView from "@components/PaginatedView";
import { SERVER_URL } from "@config/index";

const HidraLifePage: React.FC = () => (
  <PaginatedView
    title="Hidra Life 🏊"
    apiEndpoint={`${SERVER_URL}/api/store/products/`}
  />
)
export default HidraLifePage;