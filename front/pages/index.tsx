import { Product, FooterBanner, HeroBanner } from '../components'
import productsData from '../data/product.json'

export default function Home ({ product }) {
  return (
    <>
      <HeroBanner />

      <div className='products-heading'>
        <h2>Lo más vendido</h2>
        <p>Nuestros productos más vendidos últimamente</p>
      </div>

      <div className='products-container'>
        {
          product?.map(prod => <Product key={prod.id} product={prod} />)
        }
      </div>

      <FooterBanner />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = productsData.map((product) => product)
  const product = query

  return {
    props: {
      product
    }
  }
}
