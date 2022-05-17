import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../../GlobalContexts/CartContext'

const CartCircle = ({ pushtop = true, bounce =false }) => {
    const { cart } = useCart()

    return (
        <Link to='/cart' className={`relative ${pushtop ? '-top-6 w-14 h-14' : 'w-12 h-12'}  rounded-full flex justify-center ${bounce && ' scale-125 animate-bounce'} items-center bg-primary-500 ring-1 ring-black/50`}>
            <img src={require('../../../assets/cart.png')} className={pushtop ? 'w-12 h-12' : 'w-10 h-10'} />
            {cart.length > 0 && <div className='text-sm w-6 h-6 absolute -bottom-2 shadow-md -right-2 bg-white rounded-full flex justify-center items-center '>{cart?.length}</div>}
        </Link>
    )
}

export default CartCircle