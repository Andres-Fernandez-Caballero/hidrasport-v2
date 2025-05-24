import Loader from "@components/common/Loader";
import ContentMain from "@components/layout/contentMain";
import EmptyProduct from "@components/layout/product/emptyProduct";
import ProductGridList from "@components/layout/product/productGridList";
import useProducts from "app/hooks/useProducts";
import { InitFiltersProps } from "app/hooks/useProducts/contracts";
import ProductFilter from "../Filter";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Product } from "@interfaces/IProduct";
import styles from "../contentMain/styles.module.css";

interface PaginatedViewProps {
    title: string;
    initFilters?: InitFiltersProps;
}

const PaginatedView = (props: PaginatedViewProps) => {
   const pageData = useProducts(props.initFilters);
   const router = useRouter();
   const { categoria: queryParamCategory } = router.query;
   const [allProducts, setAllProducts] = useState<Product[]>([]);
   const [isLoadingMore, setIsLoadingMore] = useState(false);
   const loaderRef = useRef<HTMLDivElement>(null);
   const [isVisible, setIsVisible] = useState(true);
   const lastScrollY = useRef(0);
   const scrollThreshold = 10; // Umbral mínimo para considerar un cambio de dirección

   // Efecto para manejar la visibilidad del título basado en el scroll
   useEffect(() => {
      const handleScroll = () => {
         const currentScrollY = window.scrollY;
         
         // Solo cambiamos la visibilidad si el cambio de scroll es significativo
         if (Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
            // Si el scroll va hacia abajo, ocultar el header
            if (currentScrollY > lastScrollY.current) {
               setIsVisible(false);
            } else {
               // Si el scroll va hacia arriba, mostrar el header
               setIsVisible(true);
            }
            
            lastScrollY.current = currentScrollY;
         }
      };

      window.addEventListener("scroll", handleScroll);
      
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   // Efecto para acumular productos cuando se cargan nuevos
   useEffect(() => {
      if (!pageData.isLoading && pageData.products.length > 0) {
         setAllProducts(prevProducts => {
            // Si es la primera página, reemplazar productos
            if (pageData.currentPage === 1) {
               return [...pageData.products];
            }
            // Si no, agregar los nuevos productos
            return [...prevProducts, ...pageData.products];
         });
      }
   }, [pageData.products, pageData.currentPage, pageData.isLoading]);

   // Configurar el observador de intersección para el infinite scroll
   useEffect(() => {
      const options = {
         root: null,
         rootMargin: '0px',
         threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
         const [entry] = entries;
         if (entry.isIntersecting && !pageData.isLoading && pageData.hasNextPage()) {
            setIsLoadingMore(true);
            pageData.nextPage();
         }
      }, options);

      if (loaderRef.current) {
         observer.observe(loaderRef.current);
      }

      return () => {
         if (loaderRef.current) {
            observer.unobserve(loaderRef.current);
         }
      };
   }, [pageData.isLoading, pageData.hasNextPage, pageData.nextPage]);

   // Actualizar estado de carga
   useEffect(() => {
      if (!pageData.isLoading) {
         setIsLoadingMore(false);
      }
   }, [pageData.isLoading]);

   if (pageData.error) {
      return (
         <ContentMain>
            <header 
               className={`${styles.sectionName} ${isVisible ? '' : 'opacity-0 -translate-y-full'}`}
               style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
            >
               <h2>
                  {props.title ? `${props.title}` : ""}
               </h2>
            </header>
            <EmptyProduct />
         </ContentMain>
      );
   }

   return (
      <ContentMain>
         <header 
            className={`${styles.sectionName} ${isVisible ? '' : 'opacity-0 -translate-y-full'}`}
            style={{ transition: 'opacity 0.3s ease, transform 0.3s ease' }}
         >
            <h2>
               {props.title ? `${props.title}` : ""}
            </h2>
         </header>
         <ProductFilter 
            currentCategory={queryParamCategory as string}
            addFilter={pageData.addFilter}
            clearFilters={pageData.clearFilters}
         />
         {pageData.isLoading && allProducts.length === 0 ? (
            <Loader />
         ) : (
            <div>
               <ProductGridList products={allProducts} />
               <div ref={loaderRef} className="flex justify-center my-4 py-4">
                  {isLoadingMore && <Loader />}
               </div>
            </div>
         )}
      </ContentMain>
   );
};

export default PaginatedView;
