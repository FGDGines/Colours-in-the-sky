import { createContext, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import type { Product, CartItem } from '../types.d.js'

interface ContextProps {
  showCart: boolean
  cartItems: object[]
  totalPrice: number
  totalQuantities: number
  qty: number
  incQty: () => void
  decQty: () => void
  onAdd: (product: any, quantity: number) => void
  setShowCart: (showCart: boolean) => void
}

const Context = createContext<ContextProps>({} as ContextProps)

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  // setters
  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        }
      })

      setCartItems(updatedCartItems)
    } else {
      product.quantity = quantity

      setCartItems([...cartItems, { ...product }])
    }

    toast.success(`${qty} ${product[0].name} ${qty !== 1 ? 'añadidos' : 'añadido'} al carrito.`)
  }

  const incQty = () => setQty((prevQty) => prevQty + 1)

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1

      return prevQty - 1
    })
  }

  const props = {
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    incQty,
    decQty,
    onAdd,
    setShowCart
  }

  return <Context.Provider value={props}>{children}</Context.Provider>
}

export const useStateContext = () => useContext(Context)
