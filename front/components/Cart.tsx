import { useRef } from 'react'
import Link from 'next/link'
import { AiOulineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
// import { TiDeleteOutline } from 'react-icons/ti'
// import { toast } from 'react-hot-toast'

import { useStateContext } from '@/context/StateContext'

export function Cart () {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext()

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button
          type='button'
          className='cart-heading'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading'>Tu carrito</span>
          <span className='cart-num-items'>({totalQuantities} {totalQuantities !== 1 ? 'items' : 'item'})</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size='150' />
            <h3>Tu carrito de compras está vacio</h3>
            <Link href='/'>
              <button
                className='btn'
                type='button'
                onClick={() => setShowCart(false)}
              >
                Volver a la tienda
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 && (
            cartItems?.map((item: any) => (
              <div
                className='product'
                key={item.id}
              >
                <img className='cart-product-image' src={item?.image[0]} alt={item?.alt} />
              </div>
            )))}
        </div>

      </div>
    </div>
  )
}
