import Checkbox from "@components/common/checkbox";
import { InitFiltersProps } from "app/hooks/useProducts/contracts";
import { useState } from "react";

interface ProductFilterProps {
    currentCategory: string;
    addFilter: (filter: InitFiltersProps) => void;
    clearFilters: () => void;
}

const ProductFilter = (props: ProductFilterProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const toggleFilter = () => {
        setIsVisible(!isVisible);
    };

    return (
        <section className="hidra-section-bg text-white p-4">
            {props.currentCategory}
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Filtrar por</h2>
                <button
                    className="bg-blue-500 text-white px-3 py-1 rounded focus:outline-none hover:bg-blue-600"
                    onClick={toggleFilter}
                >
                    {isVisible ? "Ocultar" : "Mostrar"}
                </button>
            </div>
            {isVisible && (
                <div className="mt-4 flex flex-col gap-4">
                    {/* Filtro de entrega */}
                    <div className="flex justify-between items-center">
                        <span>Llega mañana</span>
                        <Checkbox />
                    </div>
                    {/* Filtro de marca */}
                    
                    {/* <div>
                        <span className="block mb-2">Categoria</span>
                        <Selector
                            options={categories.map(category => category.name)}
                            emptyOption="Seleccionar Categoria"
                            onChange={(event) => {
                                setCategory(event.target.value)
                            }}
                        />
                    </div> */}

                    {/* <div>
                        <span className="block mb-2">Sub categoria</span>
                        <Selector
                            options={subCategoriesByCategory(category)}
                            emptyOption="Seleccionar sub categoria"
                            onChange={(event) => setSubCategory(event.target.value)}
                        />
                    </div> */}
                </div>
            )}
        </section>
    );
}

export default ProductFilter;