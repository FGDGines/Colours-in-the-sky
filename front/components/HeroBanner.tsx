import Link from 'next/link'
import heroBanner from '../data/heroBanner.json'
import Image from 'next/image'

export function HeroBanner () {
  const {
    image,
    alt,
    buttonText,
    product,
    description,
    smallText,
    midText,
    largeText1
  } = heroBanner[0]

  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{smallText}</p>
        <h3>{midText}</h3>
        <h1>{largeText1}</h1>
        <Image className='hero-banner-image' src={image} alt={alt} width={450} height={450} />

        <div>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
          <div className='desc'>
            <h5>Description</h5>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
