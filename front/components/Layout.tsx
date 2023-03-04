import Head from 'next/head'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout ({ children }: any) {
  return (
    <div className='layaout'>
      <Head>
        <title>Colours in the sky</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
