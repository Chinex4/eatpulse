import React, { createContext, useState } from 'react'
export const UserProgressContext = createContext({
    progress: '',
    showCart: () => { },
    hideCart: () => { },
    showCheckout: () => { },
    hideCheckout: () => { }
})
const UserProgressContextProvider = ({ children }) => {
    const [userProgress, setUserProgress] = useState('');

    const showCart = () => {
        setUserProgress('cart');
    }
    const hideCart = () => {
        setUserProgress('');
    }
    const showCheckout = () => {
        setUserProgress('checkout');
    }
    const hideCheckout = () => {
        setUserProgress('');
    }

    const userProgressCtxValue = {
        progress: userProgress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout
    }

    return (
        <UserProgressContext.Provider value={userProgressCtxValue}>
            {children}
        </UserProgressContext.Provider>
    )
}

export default UserProgressContextProvider
