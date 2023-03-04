import Link from 'next/link'
import bannerData from '../data/footerBanner.json'

export function FooterBanner () {
  const {
    largeText1,
    largeText2,
    discount,
    saleTime,
    smallText,
    midText,
    description,
    product,
    buttonText,
    image,
    alt
  } = bannerData[0]
  return (
    <div className='footer-banner-container'>
      <div className='banner-desc'>
        <div className='left'>
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className='right'>
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{description}</p>
          <Link href={`/product/${product}`}>
            <button type='button'>{buttonText}</button>
          </Link>
        </div>
        <img
          className='footer-banner-image'
          src={image}
          alt={alt}
        />
      </div>
    </div>
  )
}
