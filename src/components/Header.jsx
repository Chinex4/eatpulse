import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import { CartContext } from '../store/CartContext'
import { UserProgressContext } from '../store/UserProgressContext'

const Header = () => {
  const cartCtx = useContext(CartContext)
  const { showCart } = useContext(UserProgressContext)
  const totalCartItem = cartCtx.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity
  }, 0)

  const handleShowCart = () => {
    showCart()
  }

  return (
    <header id='main-header'>
      <div id='title'>
        <h1>EatsPulse</h1>
        <img src={logoImg} alt="Logo" />
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({totalCartItem})</Button>
      </nav>
    </header>
  )
}

export default Header
