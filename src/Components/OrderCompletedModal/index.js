import { XIcon } from '@heroicons/react/outline'
import { CheckCircleIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useServiceSwitch } from '../../GlobalContexts/ServiceSwitch'

const OrderCompletedModal = ({ data, toggle }) => {
    const { currency } = useServiceSwitch()

    const [loading, setLoading] = useState(false)


    return (
        <div className='fixed inset-0 z-20 bg-black/75 flex justify-center font-sans items-center'>
            <div className='relative max-w-lg mx-4 sm:mx-0 flex flex-col space-y-4 p-4 bg-white h-fit w-auto rounded-lg'>
                <div className='w-full flex justify-between items-center'>
                    <span className='text-lg font-bold text-center'></span>
                    <div onClick={() => toggle(null)} className='w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded'>
                        <XIcon className='base-icon text-gray-400' />
                    </div>
                </div>
                <div className='flex flex-col space-y-2 justify-start items-center'>
                    <CheckCircleIcon className='w-12 h-12 text-green-400' />
                    <span className='text-green-500 text-center'>Order has been placed successfully.</span>
                    <span className='text-gray-400 text-sm text-center'>please wait for an available Pickr to accept your order.</span>
                </div>
                <div className='flex flex-col border-t-2 border-black/5 pt-5'>
                    <div>
                        <div className='font-light mb-2'>Delivery</div>
                        <div className='flex items-center justify-between text-sm space-y-2 space-x-4'>
                            <div className='text-gray-400 font'>Type</div>
                            <div className='font-bold'>{data.delivery.mode}</div>
                        </div>
                        <div className='flex items-center justify-between space-x-4'>
                            <div className='text-gray-400 font'>Fee</div>
                            <div className='font-bold'>{currency}{parseFloat(data.delivery.price).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
                <div className='border-b-2 pb-2 border-black/5'>
                    <div className='font-light mb-2'>Others</div>
                    <div className='flex items-center justify-between text-sm space-y-2 space-x-4'>
                        <div className='text-gray-400 font'>Subtotal</div>
                        <div className='font-bold'>{currency}{parseFloat(data.subtotal).toFixed(2)}</div>
                    </div>
                    {
                        data.discount &&
                        <div className='flex items-center justify-between text-sm space-y-2 space-x-4'>
                            <div className='text-gray-400 font'>Discount</div>
                            <div className='font-bold'>{currency}{parseFloat(data.discount).toFixed(2)}</div>
                        </div>
                    }
                </div>
                <div className='flex items-center space-x-3 text-lg font-bold pt-4 justify-end'>
                    <span className='text-center'>Total </span>
                    <span className='text-center'>{currency}{parseFloat(data.total).toFixed(2)} </span>

                </div>
                <Link to='/orders' className={`w-full py-2 hover:bg-primary-700 flex space-x-4 justify-center rounded-lg text-white bg-primary-500 font-bold text-lg items-center `}>
                    <span>See orders</span>
                </Link>
            </div>
        </div>
    )
}

export default OrderCompletedModal