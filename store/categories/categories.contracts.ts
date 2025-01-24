import { CategoryItem } from "@interfaces/hidraApi/categories";

export type CategoryStore = {
    categories: CategoryItem[];

    loadCategories: () => Promise<void>;
    subCategoriesByCategory: (categoryName: string) => string[];
}