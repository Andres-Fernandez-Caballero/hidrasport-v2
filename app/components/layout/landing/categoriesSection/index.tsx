import Image from "next/image";
import styles from "./styles.module.css";
import Link from "next/link";

const categoriesSection = () => (
    <section className="h-svh gap-1 mt-6">
        <div className={styles.sectionName}>
            <h2>Categorias</h2>
        </div>
        <div className={styles.categoriesContainer}>
            <CategoryItem
                backgroundImage={"https://hidrasport.com.ar/staticfiles/media/images/HOMBRE2_0LcQjHk.png"}
                categoryName={'Hombre'}
                categoryLink="/productos/categoria/Hombre"
            />
            <CategoryItem
                backgroundImage={"https://hidrasport.com.ar/staticfiles/media/images/MUJER_2_eDQ24Iq.png"}
                categoryName={'Mujer'}
                categoryLink="/productos/categoria/Mujer"
            />
            <CategoryItem
                backgroundImage={"https://hidrasport.com.ar/staticfiles/media/images/GUARDAVIDAS_2_BRqxsdh.png"}
                categoryName={'Invierno'}
                categoryLink="/productos/categoria/Invierno"
            />
            <CategoryItem
                backgroundImage={"https://hidrasport.com.ar/staticfiles/media/images/INVIERNO_QkNo6mi.png"}
                categoryLink="/productos/categoria/hidralife"
                categoryName={'Guardavidas'}
            />
        </div>
      </section>
);

//==========================Interfaces==========================

interface CategoryItemProps {
    backgroundImage: string;
    categoryName: string;
    categoryLink: string;
}

//==========================Components==========================

const CategoryItem = (props: CategoryItemProps) => (
    <div>
        <Link
            href={props.categoryLink}
            className="text-2xl leading-6"
        >
            <Image
                src={props.backgroundImage} 
                width={500}
                height={500}
                alt="Category Image" 
                className="w-full h-full object-cover" 
                />
            <div>
                <span>{props.categoryName}</span>
            </div>
              
        </Link>
        
    </div>
);

export default categoriesSection;
