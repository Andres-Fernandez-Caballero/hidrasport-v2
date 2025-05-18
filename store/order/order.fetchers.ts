import urls from "@config/urls";
import { IOrderItem } from "@interfaces/IOrder";

const BASE_API_ORDER_URL = urls.orders + "/orders/get-user-orders/";

interface IOrderResponse {
    orders: IOrderItem[];
}

export const fetchOrders = async(token=''):Promise<IOrderItem[]> => {
    const response = await fetch(BASE_API_ORDER_URL, {
        headers: {
            'Authorization': 'token ' + token,
        },
        credentials: "include",
    })

    if(!response.ok) throw new Error(response.statusText)
    
    const data: IOrderResponse = await response.json();
    return data.orders;
} 