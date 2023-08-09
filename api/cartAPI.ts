import { INewCartData } from "@interfaces/ICart"
import { SERVER_URL } from "@config/index";

export async function postCartToBackend(cartData: INewCartData, token: string): Promise<Response> {
  try {
    const response = await fetch(`${SERVER_URL}/api/sessions/cart/create-cart/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      body: JSON.stringify(cartData),
    });

    if (!response.ok) {
      throw new Error("Failed to post cart data");
    }
    
    return response;
  } catch (error) {
    console.error("Error posting cart data:", error);
    throw error;
  }
}
