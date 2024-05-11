export interface iCartProduct {
  title: string;
  size_id: number;
  name: string;
  color: string;
  quantity: number;
  price: number;
  image: string; // @deprecated
  img: string;
  size: string;
  subproduct: number;
  weight: number;
}

export interface iCartRequest {
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
