import React, { useContext } from 'react'
import Modal from './UI/Modal'
import { CartContext } from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Button from './UI/Button'
import { UserProgressContext } from '../store/UserProgressContext'
import CartItem from './CartItem'

const Cart = () => {
    const { items, addItem, removeItem } = useContext(CartContext)
    const { progress, hideCart, showCheckout } = useContext(UserProgressContext)

    const cartTotal = items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    )
    const handleCloseCart = () => {
        hideCart()
    }

    const handleGoToCheckout = () => {
        showCheckout()
    }

    return (
        <Modal className='cart' open={progress === "cart"} onClose={progress === 'cart' ? handleCloseCart : null}>
            <h2>Your Cart</h2>
            <ul>
                {
                    items.map(item => <CartItem key={item.id} onIncrease={() => addItem(item)} onDecrease={() => removeItem(item.id)} {...item} />)
                }
            </ul>
            <p className="cart-total">
                {currencyFormatter.format(cartTotal)}
            </p>
            <p className="modal-actions">
                <Button onClick={handleCloseCart} textOnly>Close</Button>
                {items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    )
}

export default Cart
