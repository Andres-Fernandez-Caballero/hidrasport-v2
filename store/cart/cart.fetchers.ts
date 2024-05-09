import { ResponseCartDetails, fetcherAddParams } from "./cart.contracts";

const BASE_API_CART_URL = `https://hidrasport.com.ar/api/cart`


export const fetchCartDetails = async(token=''): Promise<ResponseCartDetails> => {
    console.log('token ingresado = ' + token);
    
    let cart_mode = token !== ''? 'cart' : 'session-cart';
    let url = `${BASE_API_CART_URL}/${cart_mode}/`
    const response = await fetch(url, {
      headers: {
        'Authorization': 'token ' + token,
      },
      credentials: "include",
    });
    if(!response.ok) throw new Error(response.statusText)
    
    const data = await response.json();
    return data
}

export const fetchCartAdd = async(token='', productData: fetcherAddParams, quantity:number=1):Promise<boolean> => {
    console.log('token ingresado = ' + token);
    let cart_mode = token !== ''? 'cart' : 'session-cart';
    let url = `${BASE_API_CART_URL}/${cart_mode}`
    console.log('url -> ', url);
    

    if(token !== ''){
      url += `/modify-product/${productData.subProductId}/${productData.size}/add/${quantity}/`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `token b14d02120ab68ee82beb2ce468265aa8fc094349`
        }
      });
      return response.ok
    }else {
      url += `/modify/${productData.subProductId}/${productData.size}/add/${quantity}/`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `token b14d02120ab68ee82beb2ce468265aa8fc094349`
        },
        credentials: "include",
      });
      return response.ok
    }    
}

