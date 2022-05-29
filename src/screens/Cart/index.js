import { RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CheckoutConfirmAddress from '../../Components/Address/CheckoutConfirmAddress'
import CartItem from '../../Components/CartComponent/CartItem'
import DeliveryMode from '../../Components/DeliveryMode'
import PaymentMode from '../../Components/PaymentMode'
import { useCart } from '../../GlobalContexts/CartContext'
import { useServiceSwitch } from '../../GlobalContexts/ServiceSwitch'
import { paymentListOptions } from './data'
import { auth } from '../../config/firebase'
import { hasRequiredCheckoutInfo, sanitizeOrder } from '../../functions/paymentFunctions'
import { CreateOrder, setUserData } from '../../redux/actions'
import CheckoutDetailsModal from '../../Components/Address/CheckoutDetailsModal'
import { useAlert } from '../../GlobalContexts/ErrorContext'
import OrderCompletedModal from '../../Components/OrderCompletedModal'




const CartScreen = (props) => {
    const { user, uploadOrder } = props;
    const [deliveryPrice, setDeliveryPrice] = useState({ price: 0, mode: 'Standard' })
    const [paymentOption, setPaymentOption] = useState(paymentListOptions[0].value)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [fb_user, setFBUSER] = useState(null)
    const [finishOrder, setFinishOrder] = useState(null)


    useEffect(() => {
        setFBUSER(auth.currentUser)
        console.log(user)
    }, [])



    const cart = useCart()
    const { currency } = useServiceSwitch()
    const discount = cart.getDiscount()
    const alert = useAlert()
    const navigate = useNavigate()
    const { price } = props
    const delivery = (price.data?.price.price + ((price.data?.price.price * deliveryPrice.price) / 100))
    const total = (cart.getTotal() - discount + delivery)

    const check_out_data = {
        cartData: [...cart.cart],
        total,
        totalDiscount: discount,
        delivery: delivery,
        user: { 
            ...user.user,
             ...fb_user,
            address:  user?.user?.delivery_address? user?.user.delivery_address.address : user?.user?.address,
            country: user?.user?.delivery_address? user?.user.delivery_address.country: user?.user?.country,
            city: user?.user?.delivery_address? user?.user.delivery_address.city: user?.user?.city,
        },
        paymentMethod: paymentOption
    }

    const sendOrder = async (uid, data) => {
        await uploadOrder(uid, data)
    }

    
    const handleCheckOut = () => {
        if(!user?.user) return navigate('/dashboard') 
        if(!((user?.user?.delivery_address?.address) || (user?.user?.address)) ) return alert.setalert({title:'No Address Entered', body:'hey, you\'re almost done, locate the address bar and add a delivery address to continue.', type: 'error'})
        const required_data = {
            email: user?.user.email,
            address: user?.user.delivery_address? user?.user.delivery_address.address : user?.user.address,
            country: user?.user.delivery_address? user?.user.delivery_address.country: user?.user.country,
            city: user?.user.delivery_address? user?.user.delivery_address.city: user?.user.city,
            phoneNumber: user.user?.phone
        }
        setLoading(true)
        if (!hasRequiredCheckoutInfo(required_data)) {
            setLoading(false)
            setOpen(!open)
            return
        }
        try {
            // use dialog to confirm phone number and home address and show checkout info
            const { uid } = fb_user
            setTimeout(() => {
                sanitizeOrder(check_out_data).then(async (res) => {
                    if (!res.error) {
                        await sendOrder(uid, res).then(result => {
                            console.log(result, 'DONE!')
                            setFinishOrder({
                                subtotal: parseFloat(total) + parseFloat(discount) + parseFloat(deliveryPrice.price),
                                discount: discount,
                                total: total,
                                delivery: deliveryPrice
                            })
                        }).catch((err) => {
                            console.log(err)
                        })
                    }
                    setLoading(false)
                })
            }, 1000)
        } catch (e) {
            console.log({ error: e, screen: 'cart' })
        }
    }

    return (
        <div className='w-full h-full flex flex-col lg:flex-row overflow-y-auto pb-12 scrollbar'>
            <CheckoutDetailsModal open={open} setOpen={setOpen} />
            {finishOrder && <OrderCompletedModal  data={finishOrder} toggle={setFinishOrder} />}
            <div className='w-full lg:w-[75%] py-5 px-2 sm:px-5 border-r-2 border-black/5'>
                <div className='flex justify-between items-center px-2 sm:px-5'>
                    <div className='font-bold text-primary-500 text-lg'>My Shopping Cart</div>
                    <div onClick={() => cart.cart.length > 0 && cart.emptyCart()} className={`flex items-center ${cart.cart.length > 0 ? 'text-red-500' : 'text-gray-300'} space-x-3 cursor-pointer`}>
                        <TrashIcon className='base-icon' />
                        <span className={`font-medium `}>Empty Cart</span>
                    </div>
                </div>
                {
                    cart.cart.length <= 0 &&
                    <div className='w-full flex flex-col items-center py-4 space-y-3'>
                        <img src='https://cdn.dribbble.com/users/44167/screenshots/4199208/media/e2f1188c18430f9ab0af074ae7a88ee8.png?compress=1&resize=400x300&vertical=top' className="w-[70%] max-w-lg h-auto object-contain  " />
                        <div className='flex flex-col space-y-2 w-full items-center'>
                            <span className='font-bold text-gray-400 text-center'> Hmmm..., your cart is empty.</span>
                            <Link to="/store" className='text-blue-700 font-medium underline'>Let's go Shopping </Link>
                        </div>
                    </div>
                }
                <div className='flex flex-col h-full w-full py-5 px-2 sm:px-5'>
                    <div className='flex flex-col lg:max-h-[90%] sm:px-2 overflow-y-auto scrollbar-sm w-full'>
                        {
                            cart.cart.map((item, index) => {
                                return (
                                    <CartItem showImage={true} key={item.id} index={index} item={item} length={cart.cart.length} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            {
                cart.cart.length > 0 &&
                <div className='w-full lg:w-[25%] p-5'>
                    <div>
                        <div>
                            <CheckoutConfirmAddress {...props} />
                        </div>
                        <div>
                            <DeliveryMode disabled={true} setMode={setDeliveryPrice} />
                        </div>
                        <div>
                            <PaymentMode disabled={true} setMode={setPaymentOption} />
                        </div>
                    </div>
                    <div className='mt-auto lg:max-h-[20%] p-4 border-b-2 border-t-2 border-black/10'>
                        <div className='w-full bg-gray-200 p-5 rounded space-y-2'>
                            <div className='flex justify-between items-center'>
                                <span className='text-gray-500 font-medium'>Delivery</span>
                                <span className='text-gray-500 text-sm'>{currency} {parseFloat(delivery).toFixed(2)}</span>
                            </div>
                            {
                                discount > 0 && <div className='flex justify-between items-center'>
                                    <span className='text-gray-500 font-medium'>Discount</span>
                                    <span className='text-gray-500 text-sm'>{currency} {discount}</span>
                                </div>
                            }
                        </div>
                    </div>
                    <div onClick={() => !loading && handleCheckOut()} className={`w-full ${loading ? 'cursor-progress bg-gray-400' : 'cursor-pointer bg-primary-500 hover:bg-primary-700'} py-2 mt-2 rounded flex justify-center px-10 `}>
                        {
                            loading ?
                                <span>
                                    <RefreshIcon className='base-icon animate-spin text-white' />
                                </span>
                                :
                                <div className='flex justify-center space-x-5 w-full '>
                                    <span className='font-bold text-white text-lg'>Checkout</span>
                                    <span className='font-bold text-white text-lg'>{currency} {total.toFixed(2)}</span>
                                </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        price: state.price,
        user: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        uploadOrder: (uid, data) => dispatch(CreateOrder(uid, data)),
        updateUser: (data) => dispatch(setUserData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)
