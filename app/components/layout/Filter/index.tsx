import { InitFiltersProps } from "app/hooks/useProducts/contracts";
import { useState, useEffect } from "react";
import Selector from "@components/common/selector";
import useCategoriesStore from "@store/categories/categoriesStore";
import { useRouter } from "next/router";

interface ProductFilterProps {
    currentCategory: string;
    addFilter: (filter: InitFiltersProps) => void;
    clearFilters: () => void;
}

const ProductFilter = (props: ProductFilterProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [deliveryTomorrow, setDeliveryTomorrow] = useState(false);
    const { categories, subCategoriesByCategory } = useCategoriesStore();
    const router = useRouter();
    
    // Inicializar categoría y subcategoría basado en la URL actual
    useEffect(() => {
        const { categoria } = router.query;
        if (categoria && Array.isArray(categoria)) {
            // Si hay categoría en la URL, establecerla
            if (categoria.length > 0) {
                setCategory(categoria[0]);
            }
            // Si hay subcategoría en la URL, establecerla
            if (categoria.length > 1) {
                setSubCategory(categoria[1]);
            }
        }
    }, [router.query]);
    
    const toggleFilter = () => {
        setIsVisible(!isVisible);
    };
    
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        setSubCategory(""); // Reset subcategory when category changes
    };
    
    const handleSubCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSubCategory = event.target.value;
        setSubCategory(selectedSubCategory);
    };
    
    const applyFilters = () => {
        const filters: InitFiltersProps = {};
        
        if (category) {
            if (subCategory) {
                filters.categories = [category, subCategory];
                // Redirigir a la página de categoría/subcategoría
                router.push(`/productos/categoria/${category}/${subCategory}`);
                return; // Salir temprano ya que estamos redirigiendo
            } else {
                filters.categories = [category];
                // Redirigir a la página de categoría
                router.push(`/productos/categoria/${category}`);
                return; // Salir temprano ya que estamos redirigiendo
            }
        }
        
        if (deliveryTomorrow) {
            filters.deliveryTomorrow = true;
        }
        
        props.addFilter(filters);
        toggleFilter();
    };
    
    const handleClearFilters = () => {
        setCategory("");
        setSubCategory("");
        setDeliveryTomorrow(false);
        props.clearFilters();
    };

    return (
        <section className="hidra-section-bg text-white p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filtrar por</h2>
                <button
                    className="bg-black text-white px-4 py-2 rounded-md focus:outline-none transition-colors duration-300 flex items-center gap-2"
                    onClick={toggleFilter}
                >
                    <i className={`pi ${isVisible ? "pi-chevron-up" : "pi-chevron-down"}`}></i>
                </button>
            </div>
            {isVisible && (
                <div className="mt-4 flex flex-col gap-4">
                    {/* Filtro de entrega */}
                    {/* <div className="flex justify-between items-center">
                        <span>Llega mañana</span>
                        <Checkbox checked={deliveryTomorrow} onChange={handleDeliveryTomorrowChange} />
                    </div> */}
                    
                    {/* Filtro de categoría */}
                    <div>
                        <span className="block mb-2">Categoría</span>
                        <Selector
                            options={categories.map(cat => cat.name)}
                            emptyOption="Seleccionar Categoría"
                            onChange={handleCategoryChange}
                            value={category}
                        />
                    </div>

                    {/* Filtro de subcategoría */}
                    {category && (
                        <div>
                            <span className="block mb-2">Sub categoría</span>
                            <Selector
                                options={subCategoriesByCategory(category).map(subCat => subCat.label)}
                                emptyOption="Seleccionar Sub categoría"
                                onChange={handleSubCategoryChange}
                                value={subCategory}
                            />
                        </div>
                    )}
                    
                    {/* Botones de acción */}
                    <div className="flex justify-between mt-4">
                        <button 
                            className="rounded-md px-4 py-2 hover:bg-gray-700 transition-colors duration-300"
                            onClick={handleClearFilters}
                        >
                            Limpiar
                        </button>
                        <button 
                            className="rounded-md bg-gray-800 text-white px-4 py-2 transition-colors duration-300"
                            onClick={applyFilters}
                        >
                            Aplicar filtros
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ProductFilter;