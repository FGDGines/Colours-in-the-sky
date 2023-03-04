import Link from 'next/link'
import Image from 'next/image'

type ProductProps = {
  product: {
    id: number
    name: string
    slug: string
    image: string[]
    price: number
    details: string
  }
}

export function Product ({ product }: ProductProps) {
  const { name, slug, image, price } = product
  return (
    <div>
      <Link href={`/product/${slug}`}>
        <div className='product-card'>
          <Image
            className='product-image'
            src={image && image[0]}
            alt='puede ser una imagen de un producto'
            width={250}
            height={250}
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}
