import { IPagination } from "./IPagination";
export interface IProductListResponse extends IPagination {
  results: Product[];
}export interface ICategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  title_id: number;
  title: string;
  price: number;
  suggested_sales_price?: number;
  images: Image[];
  b2b_price: number;
}

export interface Talle {
  id: number;
  subcodigo: string;
  talle: string;
  largo: string | null;
  cadera: string | null;
  manga: string | null;
  siza: string | null;
  tiro?: unknown | null;
  bajo_busto?: string| null;
  cintura?: string | null;
  ubicacion: string | null;
  ubicacion2: string;
  caja: string | null;
  tamaño_caja?: string | null;
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

export interface ImageProducTetail {
  front: string;
  back: string;
}

// interfaces v2 de subproducto
interface Title {
  id: number;
  titulo: string;
}

interface Subproducto {
  id: number;
  images: Image[];
  talles: Talle[];
  subcodigo: string;
  color: string;
  producto: number;
}

export interface ProductDetail {
  id: number;
  price: number;
  precio_mayorista: number;
  title: Title;
  subproducto: Subproducto[];
}


