import { Product, FooterBanner, HeroBanner } from '../components'
import product from '../data/product.json'

export default function Home () {
  return (
    <>
      <HeroBanner />

      <div className='products-heading'>
        <h2>Lo más vendido</h2>
        <p>Nuestros productos más vendidos últimamente</p>
      </div>

      <div className='products-container'>
        {
          product?.map(product => <Product key={product.id} product={product} />)
        }
      </div>

      <FooterBanner />
    </>
  )
}
