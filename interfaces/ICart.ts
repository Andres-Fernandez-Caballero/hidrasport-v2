import { IPagination } from "./IPagination";

export interface ICartBase{
  id?: number;
  img: string;
  color: string;
  title: string;
  price: number;
  size: string;
  quantity: number;
}

export interface IPublicCartList extends IPagination{
  results: IPublicCart[];
}

export interface IPublicCart{
  name: string;
  items: ICartBase[];
}

export interface iCartProduct  extends ICartBase{
  size_id: number;
  image: string; // @deprecated
  subproduct: number | string;
  subproduct_id: string ;
  weight: number;
}

export interface ICartAddProduct  {
  subProductId: string;
  size: string;
}

export interface iCartProductList {
  [key: string]: iCartProduct;
}

export interface INewCartData {
  name: string;
  public: boolean;
  clear: boolean;
}

export interface ICartSelector {
  id: number;
  name: string;
}
