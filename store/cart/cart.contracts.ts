import { ICartAddProduct, iCartProduct } from "@interfaces/ICart";

export type CartStore = {
    cartData: iCartProduct[];
    totalAmount: number;
    cartIsLoading: boolean;

    /**
     * calculates the total amount of cart from the backend
     * @returns number total amount of cart
     */
    getTotalAmount: () => Promise <number>;

    /**
     * update cart from the server
     * @returns 
     */
    fetchCart: () => void;
    
    /**
     * remove item from cart
     * @param iCartProduct
     * @returns Promise<void>
     */
    removeFromCart: (product: iCartProduct) => Promise<void>;

    /**
     * increment in one the quantity of a product
     * @param iCartProduct
     * @params number of the quantity to increment
     * @returns Promise<void>
     */
    addItemToCart: (product: iCartProduct | ICartAddProduct, quantity: number ) => Promise<void>;

    /**
     * subtract one unit from a product
     * @todo this method should be included in the api call
     * @param iCartProduct
     * @returns Promise<void>
     */
    substractItemFromCart: (product: iCartProduct) => Promise<void>; // subtract one unit from a product
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
