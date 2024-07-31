export interface iCartProduct {
  title: string;
  size_id: number;
  color: string;
  quantity: number;
  image: string; // @deprecated
  img: string;
  price: number;
  size: string;
  subproduct: number | string;
  subproduct_id: string ;
  weight: number;
  id?: number;
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
