import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CategoryStore } from "./categories.contracts";
import { fetchCategories } from "./categories.fetchers";

const useCategoriesStore = create<CategoryStore>()(
    persist(
        (set, get) => ({
            categories: [],

            loadCategories: async () => {
                const categories = await fetchCategories();
                set({ categories });
            },

            subCategoriesByCategory: (categoryName: string): string[] => {
                const category = get().categories.find(cat => cat.name === categoryName);

                return category ? category.sub_cat_col.flatMap(subCatCol => subCatCol.subcategories) : [];
            }
        }),
        { name: 'categories', getStorage: () => localStorage }
    )
);
export default useCategoriesStore;