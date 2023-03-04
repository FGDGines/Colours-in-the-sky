import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShoppingCart, AiOutlineMenu } from 'react-icons/ai'

export function Navbar () {
  return (
    <div className='navbar-container'>

      <button
        type='button'
        className='menu-icon'
      >
        <AiOutlineMenu />
      </button>

      <p className='Logo'>
        <Link href='/'>
          <Image src='/assets/logo.png' alt='Logo' width={60} height={60} />
        </Link>
      </p>

      <button
        type='button'
        className='cart-icon'
      >
        <AiOutlineShoppingCart />
        <span className='cart-item-qty'>1</span>
      </button>
    </div>
  )
}
