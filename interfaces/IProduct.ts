import { IPagination } from "./IPagination";
export interface IProductListResponse extends IPagination {
  results: Product[];
}export interface ICategory {
  id: number;
  name: string;
}

export interface Product {
  title_id: number;
  title: string;
  price: number;
  images: Image[];
  b2b_price: number;
}

export interface Talle {
  id?: number;
  subcodigo: string;
  talle: string;
  largo: string | null;
  cadera: string | null;
  manga: string | null;
  siza: string | null;
  tiro?: unknown | null;
  bajo_busto?: unknown;
  cintura?: unknown;
  ubicacion: string | null;
  caja: string | null;
  tamaño_caja?: unknown;
  cantidad: number | null;
  cantidad2: number | null;
  subproducto: number | null;
}

export interface Image {
  image: string;
}

export interface ISubproducto {
  id: number;
  talles: Talle[];
  images: Image[];
  subcodigo: string;
  color: string;
  producto: number;
}

export interface ProductDetail {
  id: number;
  title: string;
  price: number;
  precio_mayorista: number;
  available_colors: string[];
  available_sizes: string[];
  subcodigo_color_dict: SubCodigoColorDictionary;
}

export interface ImageProducTetail {
  front: string;
  back: string;
}

interface SubCodigoColorDictionary {
  [key: string]: {
    color: string;
    sizes: string[];
    images: ImageProducTetail;
  };
}

export interface Variant {
  subProductId: string;
  color: string;
  images: ImageProducTetail;
  sizes: string[];
}
