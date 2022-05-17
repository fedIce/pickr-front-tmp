import React, { createContext, useContext, useState } from 'react'
import { connect } from 'react-redux';
import useSound from 'use-sound';
import PopIn from '../../assets/popsound.wav';
import { localCartUpdate } from '../../redux/actions';
import * as t from '../../redux/action-types'


const cart = {
    addItemToCart: (data) => null,
    removeItemFromCart: (id) => null,
    getCartItems: (id) => null,
    updateCart: (id, key, value) => null,
    getTotal: () => null,
    emptyCart: () => null,
    getDiscount: () => null
}

const CartContext = createContext(cart)

const Cart = ({ children, localCartUpdate, cartData }) => {
    const [cart, setCart] = useState(cartData.data)

    const [playin] = useSound(
        PopIn,
        { volume: 0.2 }
    )

    const addItemToCart = (data) => {
        if (cart.length <= 0) {
            playin()
        }
        const _data = [...cart, data].sort((a, b) => a.id > b.id ? 1 : -1)
        setCart(_data)
        localCartUpdate(_data, t.CART_ADD )
    }

    const removeItemFromCart = (id) => {
        const data = cart.filter(d => d.id !== id)
        setCart(data)
        localCartUpdate(data, t.CART_UPDATE )

    }

    const emptyCart = () => {
        setCart([])
        localCartUpdate([], t.CART_DELETE )

    }

    const getCartItems = (id) => {
        const data = cart.filter(d => d.id === id)
        return data[0]
    }

    const getTotal = () => {
        let total = 0
        cart.forEach(item => {
            total += parseFloat(item.price) * parseInt(item.count)
        })
        return total
    }

    const getDiscount = () => {
        let total = 0
        cart.forEach(item => {
            if (item.discount) {
                total += parseFloat(item.discount) * parseInt(item.count)
            }
        })
        return total.toFixed(2)
    }

    const updateCart = (id, key, value) => {
        if (!cart.some(i => i.id === id)) return
        let data = cart.filter(d => d.id !== id)
        let _obj = cart.filter(d => d.id === id)[0]
        _obj[key] = value
        const cart_data = [...data, _obj].sort((a, b) => a.id > b.id ? 1 : -1)
        setCart(cart_data)
        localCartUpdate(cart_data, t.CART_UPDATE )

    }

    const value = { addItemToCart, removeItemFromCart, getCartItems, updateCart, getTotal, emptyCart, getDiscount, cart }
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}

const mapStateToProps = (state) => {
    return {
        cartData: state.cart
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        localCartUpdate: (data, type) => dispatch(localCartUpdate(data, type))
    }
}

export const useCart = () => useContext(CartContext)

export default connect(mapStateToProps, mapDispatchToProps)(Cart)