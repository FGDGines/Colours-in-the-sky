import { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
// import { toast } from 'react-hot-toast'

import { useStateContext } from '@/context/StateContext'

export function Cart () {
  const cartRef = useRef()
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext()

  const hideCart = (e: any) => {
    if (cartRef.current === e.target) {
      setShowCart(false)
    }
  }

  return (
    <div className='cart-wrapper' onClick={hideCart} ref={cartRef}>
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
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                      <p className='quantity-desc'>
                        <span className='minus' onClick={() => toggleCartItemQuantity(item.id, 'dec')}>
                          <AiOutlineMinus />
                        </span>

                        <span className='num'>{item.quantity}</span>

                        <span className='plus' onClick={() => toggleCartItemQuantity(item.id, 'inc')}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      className='remove-item'
                      type='button'
                      onClick={() => onRemove(item)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            )))}
        </div>

        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotál:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='btn-container'>
              <button
                className='btn'
                onClick=''
                type='button'
              >Pagar con Stripe
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
