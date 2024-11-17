import { ResponseCartDetails, fetcherAddParams } from "./cart.contracts";
import urls from "@config/urls";


export const fetchCartDetails = async(token=''): Promise<ResponseCartDetails> => {
    let response;
    if(token !== ''){ 
      response = await fetch(`${urls.cart}cart/`, {
        headers: {
          'Authorization': 'token ' + token,
        },
        credentials: "include",
      });
    }else {
      response = await fetch(`${urls.cart}session-cart/`, {
        credentials: "include",
      });
    }
   
    if(!response.ok) throw new Error(response.statusText)
    
    const data = await response.json();
    return data
}
export const fetchCartAdd = async(token = '', productData: fetcherAddParams, quantity: number = 1): Promise<boolean | string> => {
  const cart_mode = token !== '' ? 'cart' : 'session-cart';
  let url = `${urls.cart}${cart_mode}`;

  try {
      let response;
      if (token !== '') {
          url += `/modify-product/${productData.subProductId}/${productData.size}/add/${quantity}/`;

          response = await fetch(url, {
              headers: {
                  'Authorization': 'token ' + token
              }
          });
      } else {
          url += `/modify/${productData.subProductId}/${productData.size}/add/${quantity}/`;

          response = await fetch(url, {
              credentials: "include",
          });
      }

      if (!response.ok) {
          if (response.status === 404) {
              // Obtener el mensaje del cuerpo de la respuesta
              const errorData = await response.json();
              throw new Error(errorData.detail || 'Producto no encontrado');
          } else {
              const errorMessage = await response.text(); 
              throw new Error(errorMessage || 'Error al modificar el carrito');
          }
      }

      return true;
  } catch (error) {
      // Muestra o retorna el mensaje de error
      console.error('Error al añadir producto al carrito:', error);
      return `Error: ${error.message}`; // También puedes retornar el error como string
  }
};


export const fetchTotalAmount = async (token=''):Promise<number> => {

  const cart_mode = token !== ''? 'cart' : 'session-cart';
    let url = `${urls.cart}${cart_mode}`
    
    if(token !== ''){
      url += `/products-value/`;

      const response = await fetch(url, {
        headers: {
          'Authorization': 'token ' + token
        }
      });
      
      if(response.ok){
        const data = await response.json();
        return data.total_price;
      }else {
        return -1;
      }
    }else {
      url += `/products-value/`
      
      const response = await fetch(url, {
        credentials: "include",
      });
      if(response.ok){
        const data = await response.json();
        return data.total_price;
      }else {
        return -1;
      }
    }    
}

export const fetchCartRemove = async(token='', productData: fetcherAddParams):Promise<boolean> => {
  const cart_mode = token !== ''? 'cart' : 'session-cart';
    let url = `${urls.cart}${cart_mode}`
    
    if(token !== ''){
      url += `/modify-product/${productData.subProductId}/${productData.size}/substract/1/`;

      const response = await fetch(url, {
        headers: {
          'Authorization': 'token ' + token
        }
      });
      return response.ok
      
    }else {
      url += `/modify/${productData.subProductId}/${productData.size}/substract/1/`;
      
      const response = await fetch(url, {
        credentials: "include",
      });
      return response.ok
    }    

}

