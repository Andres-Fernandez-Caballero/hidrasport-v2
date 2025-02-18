import { CategoryItem } from "@interfaces/hidraApi/categories";
import { ILink } from "@interfaces/ILink";

export type CategoryStore = {
    categories: CategoryItem[];

    loadCategories: () => Promise<void>;
    subCategoriesByCategory: (categoryName: string) => ILink[];
}