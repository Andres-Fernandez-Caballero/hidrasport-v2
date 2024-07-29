import styles from "./styles.module.css";
const categoriesSection = () => (
    <section className="h-svh gap-1 mt-6">
        <div className={styles.sectionName}>
            <h2>Categorias</h2>
        </div>
        <div className={styles.categoriesContainer}>
            <CategoryItem
                backgroundImage={"https://hidrasport.com.ar/staticfiles/media/images/HOMBRE2_0LcQjHk.png"}
                categoryName={'Hombre'}
            />
            <CategoryItem
                backgroundImage={"https://hidrasport.com.ar/staticfiles/media/images/MUJER_2_eDQ24Iq.png"}
                categoryName={'Mujer'}
            />
            <CategoryItem
                backgroundImage={"https://hidrasport.com.ar/staticfiles/media/images/GUARDAVIDAS_2_BRqxsdh.png"}
                categoryName={'Invierno'}
            />
            <CategoryItem
                backgroundImage={"https://hidrasport.com.ar/staticfiles/media/images/INVIERNO_QkNo6mi.png"}
                categoryName={'Guardavidas'}
            />
        </div>
      </section>
);

//==========================Interfaces==========================

interface CategoryItemProps {
    backgroundImage: string;
    categoryName: string;
}

//==========================Components==========================

const CategoryItem = (props: CategoryItemProps) => (
    <div>
        <img 
            src={props.backgroundImage} 
            alt="Category Image" 
            className="w-full h-full object-cover" 
        />
        <div>
            <span>{props.categoryName}</span>
        </div>
    </div>
);

export default categoriesSection;
