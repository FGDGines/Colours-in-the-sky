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
  toggleCartItemQuantity: (id: number, value: string) => void
  onRemove: (product: CartType) => void
}

const Context = createContext<ContextProps>({} as ContextProps)

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<CartType[]>([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  let foundProduct: CartType
  let index: number

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

  const onRemove = (product: CartType) => {
    foundProduct = cartItems.find((item) => item.id === product.id) as CartType
    const newCartItems = cartItems.filter((item) => item.id !== product.id)
    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity)
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity)
    setCartItems(newCartItems)
  }

  const toggleCartItemQuantity = (id: number, value: string) => {
    foundProduct = cartItems.find((item) => item.id === id) as CartType
    index = cartItems.findIndex((product) => product.id === id)
    const newCartItems = cartItems.filter((item) => item.id !== id)

    if (value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 }])
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if (value === 'dec') {
      if (foundProduct.quantity <= 1) return
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 }])
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
    }
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
    setShowCart,
    toggleCartItemQuantity,
    onRemove
  }

  return <Context.Provider value={props}>{children}</Context.Provider>
}

export const useStateContext = () => useContext(Context)
