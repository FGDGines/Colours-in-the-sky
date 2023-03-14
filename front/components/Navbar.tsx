import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { Cart } from '@/components'
import { useStateContext } from '@/context/StateContext'

export function Navbar () {
  const [showMenu, setShowMenu] = useState(false)
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  const openMenu = () => setShowMenu(!showMenu)
  const hideMenu = () => setShowMenu(false)

  return (
    <div className='navbar-container'>

      <button
        type='button'
        className='menu-icon'
        onClick={openMenu}
      >
        {showMenu ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>

      <nav className={`nav ${showMenu ? 'active' : ''}`}>
        <Link className='nav__link' href='/' onClick={hideMenu}>Inicio</Link>
        <Link className='nav__link' href='#' onClick={hideMenu}>Tienda</Link>
        <Link className='nav__link' href='#' onClick={hideMenu}>Contácto</Link>
      </nav>

      <p className='Logo'>
        <Link href='/'>
          <Image src='/assets/logo.png' alt='Logo' width={60} height={60} />
        </Link>
      </p>

      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(!showCart)}
      >
        <AiOutlineShoppingCart />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}
