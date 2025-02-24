export interface CategoryItem {
    id: number;
    name: string;
    highlighted: boolean;
    image: string;
    sub_cat_col: SubCategoryColumn[];
}

interface SubCategoryColumn {
    name: string;
    subcategories: string[];
}

export interface CategoriesResponse {
    navbar: CategoryItem[];
}
