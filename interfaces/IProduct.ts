export interface ICategory {
	id: number;
	name: string;
}

export interface Product {
	title_id: number;
	price: number;
	title: string;
	images : Image[];
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

export interface IProductListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: Product[];
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

interface SubCodigoColorDictionary {
	[key: string]: {
	  color: string;
	  sizes: string[];
	};
  }