import PaginatedView from "@components/layout/PaginatedView";

export default function BestOfPage() {
    return (
        <PaginatedView
            title="Destacados"
            apiEndpoint="/api/products/bestof"
        />
    )
}