import { useState } from 'react'
import productsData from '../../data/product.json'
import { Product } from '@/components'
import {
  AiOutlineStar,
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus
} from 'react-icons/ai'

import { useStateContext } from '@/context/StateContext'

export default function ProductDetails ({ product, products }) {
  const [index, setIndex] = useState(0)
  const { image, alt, name, details, price } = product[0]
  const { decQty, incQty, qty, onAdd } = useStateContext()
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              className='product-detail-image'
              src={image[index]}
              alt={alt}
            />
          </div>
          <div className='small-images-container'>
            {image?.map((image, i) => (
              <img
                className={`small-image ${i === index && 'selected-image'}`}
                key={i}
                src={image}
                alt={alt}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>

          <h4>Detalles:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Cantidad:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />
              </span>

              <span className='num'>{qty}</span>

              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className='buttons'>
            <button className='add-to-cart' type='button' onClick={() => onAdd(product, qty)}>
              Agregar al carrito
            </button>
            <button className='buy-now' type='button'>
              Comprar ahora
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-products-wrapper'>
        <h2>También te podría gustar</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products?.map((item: any) => (
              <Product key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths () {
  const paths = productsData.map((product) => ({
    params: { slug: product.slug }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps ({ params: { slug } }) {
  const query = productsData.filter((product) => product.slug === slug)
  const productQuery = productsData.filter(
    (product) => product.category !== slug
  )

  const product = query
  const products = productQuery

  return {
    props: {
      product,
      products
    }
  }
}
