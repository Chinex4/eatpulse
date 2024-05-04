import React, { useContext } from 'react'
import Modal from './UI/Modal'
import { CartContext } from '../store/CartContext'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import { UserProgressContext } from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

const Checkout = () => {
    const { items, clearCart } = useContext(CartContext);
    const { progress, hideCheckout } = useContext(UserProgressContext);
    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:4000/orders', requestConfig)
    const cartTotal = items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    )

    const handleClose = () => {
        hideCheckout();
    }

    const handleFinish = () => {
        hideCheckout();
        clearCart();
        clearData();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target)
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify(
                {
                    order: {
                        items: items,
                        customer: customerData,
                    },
                }
            )
        );

    }

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleClose}>
                Close
            </Button>
            <Button>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <span>Sending Order Data...</span>
    }

    if (data && !error) {
        return <Modal open={progress === "checkout"} onClose={handleFinish}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email within the next few minutes</p>
            <p className="modal-actio">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return (
        <Modal open={progress === "checkout"} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>
                    Checkout
                </h2>
                <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id="name" />
                <Input label="Email Address" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className="control-row">
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error} />}
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </Modal>
    )
}

export default Checkout
