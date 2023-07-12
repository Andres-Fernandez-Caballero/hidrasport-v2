import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>HidraSport 🏊</title>
        <meta name="description" content="Hidrasport ropa deportiva" />
        <link rel="icon" href="/tortuga_logo.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          HidraSport 🏊
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          GITHUB
        </a>
      </footer>
    </div>
  )
}

export default Home
