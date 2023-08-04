import Head from 'next/head';
import React from 'react';
import Navbar from './navbar';
import Footer from './footer'
import WhatsappFloatingButton from './WhatsappFloatingButton';


type LayoutProps = {
    children: React.ReactNode
}
const Layout = ({ children }: LayoutProps)  => {    
    return (
        <>
        <Head>
            <title>HidraSport 🏊</title>
            <meta name="description" content="Hidrasport ropa deportiva" />
            <link rel="icon" href="/tortuga_logo.png" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        </Head>
        <Navbar />
        <main>
            {children}
        </main>
            <WhatsappFloatingButton/>

        <Footer/>
    </>
        
    )
}

export default Layout