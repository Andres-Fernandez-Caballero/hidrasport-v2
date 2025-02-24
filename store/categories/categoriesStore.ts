import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CategoryStore } from "./categories.contracts";
import { fetchCategories } from "./categories.fetchers";
import { ILink } from "@interfaces/ILink";

const useCategoriesStore = create<CategoryStore>()(
    persist(
        (set, get) => ({
            categories: [],

            loadCategories: async () => {
                const categories = await fetchCategories();
                set({ categories });
            },

            subCategoriesByCategory: (categoryName: string): ILink[] => {
                const category = get().categories.find(cat => cat.name === categoryName);
                return category ? category.sub_cat_col.flatMap(subCatCol => ({ 
                    url: `/productos/categoria/${categoryName +'/'+subCatCol.name}`, 
                    label: subCatCol.name,
                    items: subCatCol.subcategories ? subCatCol.subcategories.map(subSubCat => ({ 
                        url: `/productos/categoria/${categoryName +'/'+subCatCol.name+'/'+subSubCat}`, 
                        label: subSubCat,
                       })) : [],
                   })) : [];
            }
        }),
        { name: 'categories', getStorage: () => localStorage }
    )
);
export default useCategoriesStore;