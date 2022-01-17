import React, {useEffect, useState} from "react"

import Context from "./Context"
import config from "../resources/config"
import apiFetch from "../resources/apiFetch"

const GlobalState = props => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])
    const [cartPrice, setCartPrice] = useState(0)

    const fetchProducts = async () => {
        const response = await apiFetch.get(
            `${config.endpointUrl}/products`
        )
        const newProducts = response.data
        setProducts(newProducts)

    }

    const addProduct = product => {
        const newCart = [...cart, product];
        setCart(newCart)
    }

    const removeProduct = productId => {
        const position = cart.findIndex( product => product.id === parseInt(productId))
        if( position >= 0 ){
            const newCart = [...cart];
            newCart.splice(position, 1);
            setCart(newCart)
        }
    }

    const updateCartPrice = () => {
        let newCartPrice = 0;
        cart.map(
            product => newCartPrice = newCartPrice + parseFloat(product.price)
        )
        setCartPrice(newCartPrice)
    }

    const clearCart = () => {
        setCart([])
    }

    const thisProductIsInCart = productId => {
        console.log( cart )
        const exist = cart.findIndex( product => product.id === parseInt(productId) ) >= 0;
        console.log( exist, productId )
        return exist;
    };

    useEffect(() => {
        updateCartPrice()
    }, [cart])

    return (
        <Context.Provider
            value={{ 
                products,
                cart,
                setCart,
                addProduct,
                removeProduct,
                thisProductIsInCart,
                cartPrice,
                clearCart
            }}
        >
            {props.children}
        </Context.Provider>
    )
}
export default GlobalState;