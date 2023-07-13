export interface Title {
	id: number;
	titulo: string;
	preguntas: string;
	descripcion: string;
	info_tienda: string;
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

export interface Subproducto {
	id: number;
	talles: Talle[];
	images: Image[];
	subcodigo: string;
	color: string;
	producto: number;
}

export interface IProduct {
	id: number;
	title: Title;
	subproducto: Subproducto[];
	code: string;
	name: string;
	description: string;
	sex: string;
	guard: string;
	cloth: string;
	design: string;
	size: string;
	weight: number;
	color_details: string;
	missing: string | null;
	price: number;
	precio_mayorista: number;
	bestof: boolean;

	tabla_talles: string;
	discount: number;
	categories: number[];
	talles?: Talle[];
}

export interface IProductListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: IProduct[];
}
