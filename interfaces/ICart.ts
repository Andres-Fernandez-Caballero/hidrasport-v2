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

// @deprecated
export interface iCartProduct  extends ICartBase{ 
  size_id: number;
  subproduct_id: string ;
  weight: number;
  total_item_price: number;
  title: string;
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