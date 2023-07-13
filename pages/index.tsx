import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

const Home: NextPage = () => (
    <>
      <div className='flex justify-center'>
        <menu className='grid gap-1 grid-rows-2 grid-cols-2'>
          <figure className=' relative opacity-90'>
            <Image src="/images/banners/mujer.jpeg" alt="mujer atleta" width={500} height={500} className='rounded-sm' />
            <h2 className='absolute top-0 left-0 p-4 text-lg text-red-100'>Mujeres</h2>
          </figure>
          <figure className='relative opacity-90'>
            <Image src="/images/banners/hombre.jpeg" alt="hombre atleta" width={500} height={500} />
            <h2 className='absolute top-0 left-0 p-4 text-lg text-red-100'>Hombres</h2>
          </figure >
          <figure className='relative opacity-90'>
            <Image src="/images/banners/guardavida.jpeg" alt="Guardavida" width={500} height={500} />
            <h2 className='absolute top-0 left-0 p-4 text-lg text-red-100'>Guardavidas</h2>
          </figure>
          <figure className='relative opacity-80'>
            <Image src="/images/banners/invierno.png" alt="ropa invernal" width={500} height={500} />
            <h2 className='absolute top-0 left-0 p-4 text-lg text-white'>Invierno</h2>
          </figure>
        </menu>
      </div>
      <div className="carrusel">

      </div>
    </>
  )


export default Home
