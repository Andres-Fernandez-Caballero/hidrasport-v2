import { ResponseCartDetails, fetcherAddParams } from "./cart.contracts";
import urls from "@config/urls";


export const fetchCartDetails = async(token=''): Promise<ResponseCartDetails> => {
    let response;
    console.log("--------------------------------")
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

export const fetchCartAdd = async(token='', productData: fetcherAddParams, quantity:number=1):Promise<boolean> => {
    const cart_mode = token !== ''? 'cart' : 'session-cart';
    let url = `${urls.cart}${cart_mode}`
    
    if(token !== ''){
      url += `/modify-product/${productData.subProductId}/${productData.size}/add/${quantity}/`;

      const response = await fetch(url, {
        headers: {
          'Authorization': 'token ' + token
        }
      });
      return response.ok
    }else {
      url += `/modify/${productData.subProductId}/${productData.size}/add/${quantity}/`
      
      const response = await fetch(url, {
        credentials: "include",
      });
      return response.ok
    }    
}


export const fetchTotalAmount = async (token=''):Promise<number> => {

  const cart_mode = token !== ''? 'cart' : 'session-cart';
    let url = `${urls.cart}/${cart_mode}`
    
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
  console.log('fetchCartRemove', token, productData);
  
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

