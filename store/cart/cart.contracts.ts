import { iCartProduct, iCartRequest } from "@interfaces/ICart";

export type CartStore = {
    cartData: iCartProduct[];
    cartIsLoading: boolean;
    fetchCart: () => void;
    addToCart: (product: iCartRequest) => void;
  };

export type ResponseCartDetails = {
    cart: {
        items: iCartProduct[]
    }
}

export type fetcherAddParams = {
    subProductId: string;
    size: string;
}
