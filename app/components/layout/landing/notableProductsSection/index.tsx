import styles from "./styles.module.css";
import ProductCardItem from "@components/layout/product/productCardItem";
import { Product } from "@interfaces/IProduct";

interface NotableProductsProps {
    products: Product[]
}

const NotablesProductsSection = (props: NotableProductsProps) => {
    return (
    <section className="h-svh gap-1 mt-6">
        <div className={styles.sectionName}>
            <h2>Imperdibles</h2>
        </div>
        <div className={styles.productsContainer}>
            {props.products.map((product,) => (
            <div key={product.title_id}>
                <ProductCardItem
                  product={product} />
            </div>
          ))}
        </div>
      </section>
)}

//==========================Interfaces==========================


//==========================Components==========================



export default NotablesProductsSection;
