import { use, useEffect } from 'react'
import Layout from '../components/layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { apiCall } from 'tools/apiCall'
import useCartStore from '@store/useCartStore'
import { toast } from 'react-toastify'
import { get } from 'http'

const MyApp = ({ Component, pageProps }: AppProps) =>{
  const {fetchCart, cartData} = useCartStore()
  useEffect(() => {
    try{
      fetchCart()
      toast.success('Carrito cargado correctamente items cargados: ' + cartData.length, {autoClose: 2000})
    }catch(error){
      toast.error((error as Error).message )
      console.log('error', error);
    }
  }, [])
  return(  
    <Layout>
      <Component {...pageProps} />
    </Layout>
    )
  }
export default MyApp
