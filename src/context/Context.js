import { createContext } from "react";

const context = createContext({
    products: [],
    cart: [],
    addProduct: product => {},
    removeProduct: productId => {},
    cartPrice: 0,
    updateCartPrice: () => {},
    thisProductIsInCart: productId => {},
    clearCart: () => {}
})

export default context;