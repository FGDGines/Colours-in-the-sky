import { createContext, useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import type { ProductType, CartType } from '../types.d.js'

interface ContextProps {
  showCart: boolean
  cartItems: object[]
  totalPrice: number
  totalQuantities: number
  qty: number
  incQty: () => void
  decQty: () => void
  setShowCart: (showCart: boolean) => void
  onAdd: (product: ProductType, quantity: number) => void
}

const Context = createContext<ContextProps>({} as ContextProps)

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<CartType[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  const onAdd = (product: ProductType, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id)

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity)

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map(cartProduct => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity
          }
        }

        return cartProduct
      })

      setCartItems(updatedCartItems as CartType[])
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }] as CartType[])
    }

    toast.success(`${qty} ${product.name} ${qty !== 1 ? 'añadidos' : 'añadido'} al carrito.`)
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
