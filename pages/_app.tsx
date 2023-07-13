import Layout from '../components/layout'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) =>(
    <Layout>
      <Component {...pageProps} />
    </Layout>
    )

export default MyApp
