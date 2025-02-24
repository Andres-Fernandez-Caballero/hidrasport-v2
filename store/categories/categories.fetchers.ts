import urls from "@config/urls";
import { CategoriesResponse, CategoryItem } from "@interfaces/hidraApi/categories";

export const fetchCategories = async ():Promise<CategoryItem[]> => {
    const response = await fetch(urls.categoriesList);
    const data = await response.json() as CategoriesResponse;
    return data.navbar;
}