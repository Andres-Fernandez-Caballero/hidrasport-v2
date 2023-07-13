import Head from 'next/head';
import React from 'react';
import Navbar from './navbar';


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
        </Head>
        <Navbar />
        <main>
            {children}
        </main>

        <footer>
            <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            >
            GITHUB
            </a>
      </footer>
    </>
        
    )
}

export default Layout