import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCart } from '../../GlobalContexts/CartContext'
import { useServiceSwitch } from '../../GlobalContexts/ServiceSwitch'
import CartItem from './CartItem'

const CartComponent = (props) => {

    const cart = useCart()
    const { currency } = useServiceSwitch()
    const {price} = props
    const discount = cart.getDiscount()


    const InPageCart = () => {
        return (
            <div className='flex flex-col h-[90%] w-full '>
                <div className='flex flex-col max-h-[80%]  px-2 overflow-y-auto scrollbar-sm w-full'>
                    {
                        cart.cart.map((item, index) => {
                            return (
                                <CartItem key={item.id} index={index} item={item} length={cart.cart.length} />
                            )
                        })
                    }
                </div>
                <div className='mt-auto max-h-[20%] px-4 border-b-2 py-2 border-t-2 border-black/10'>
                    <div className='w-full bg-gray-200 p-5 rounded space-y-2'>
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-500 font-medium'>Delivery</span>
                            <span className='text-gray-500 text-sm'>{currency} {parseFloat(price.data?.price.price).toFixed(2)}</span>
                        </div>
                        { discount > 0 && <div className='flex justify-between items-center'>
                            <span className='text-gray-500 font-medium'>Discount</span>
                             <span className='text-gray-500 text-sm'>{currency} {discount}</span>
                        </div>}
                    </div>
                </div>
                <Link to='/cart' className='w-full py-2 mt-2 rounded flex justify-center space-x-5 px-10 bg-primary-500 hover:bg-primary-700'>
                    <span className='font-bold text-white text-lg'>Go To Cart</span>
                    <span className='font-bold text-white text-lg'>{currency} {(cart.getTotal() - discount).toFixed(2)}</span>
                </Link>
            </div>
        )
    }

    return (
        <div className='w-full h-full p-5 '>
            {
                cart.cart.length <= 0 ?
                    <div className='w-full flex flex-col items-center py-4 space-y-3'>
                        <img src='https://cdn.dribbble.com/users/44167/screenshots/4199208/media/e2f1188c18430f9ab0af074ae7a88ee8.png?compress=1&resize=400x300&vertical=top' className="w-[70%] h-auto object-contain  " />
                        <div className='flex flex-col space-y-2 w-full items-center'>
                            <span className='font-bold text-gray-400 text-center'> Hmmm..., your cart is empty.</span>
                            <Link to="/store" className='text-blue-700 font-medium underline'>Let's go Shopping </Link>
                        </div>
                    </div>
                    :
                    <InPageCart />
            }
        </div>
    )


}

const mapStateToProps = (state) => {
    return {
        price: state.price
    }
}

export default connect(mapStateToProps,null)(CartComponent)