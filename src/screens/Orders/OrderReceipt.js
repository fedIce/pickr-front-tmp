import { MapIcon, PhoneIcon } from '@heroicons/react/outline'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from '../../Components/Modal'
import VerticalProgressBar from '../../Components/UI/VerticalProgressBar'
import { useServiceSwitch } from '../../GlobalContexts/ServiceSwitch'

const OrderReceipt = ({ open, setOpen, data, count, progress, status, fees }) => {
    const { currency } = useServiceSwitch()
    useEffect(() => {
        console.log(data)
    }, [open])

    const courier = data.accepter_details ? data.accepter_details : null

    return (
        <Modal open={open} setOpen={setOpen}>
            <div className='min-w-xl w-full h-[95vh] bg-gray-100 rounded-lg p-5 overflow-y-auto scrollbar'>
                {
                    courier ?
                        <div className=' min-h-[20%] py-10 px-5 bg-white space-y-4 rounded-lg mb-4 flex flex-col justify-center items-center'>
                            <div className='flex flex-col justify-center items-center space-x-4'>
                                <div className='w-20 h-20 '>
                                    <img src={courier?.avatar} className='w-full h-full rounded-full object-cover' />
                                </div>
                                <div className='flex flex-col'>
                                    <span className='text-lg font-bold'>{courier?.name}</span>
                                    <span className='text-sm font-light text-gray-500'>Pickr Agent</span>
                                    <span className='text-sm font-light text-gray-500'>{data.paymentmethod}</span>
                                </div>
                            </div>

                            <div>
                                <div className=' text-white flex items-center space-x-6 '>
                                    <div className='w-12 h-12 flex justify-center self items-center rounded-full bg-red-600'>
                                        <PhoneIcon className='base-icon' />
                                    </div>
                                    <div className='w-12 h-12 flex justify-center items-center rounded-full bg-green-600'>
                                        <PhoneIcon className='base-icon' />
                                    </div>
                                </div>
                            </div>
                            <div className=''>
                                <div className='flex items-center px-10 py-2 bg-red-600 rounded-full space-x-2 text-white font-bold'>
                                    <MapIcon className='base-icon' />
                                    <span>View Route In Map</span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='min-h-[20%] py-10 px-5 bg-white space-y-4 rounded-lg mb-4 flex flex-col justify-center items-center'>
                            <div className='w-20 h-20 '>
                                <img src='https://cdn.dribbble.com/users/2356327/screenshots/5852098/ezgif.com-video-to-gif_still_2x.gif?compress=1&resize=400x300' className='w-full h-full rounded-full object-cover' />
                            </div>
                            <div className='text-gray-400 text-sm font-sans'>
                                please wait while we find you a Pickr...
                            </div>
                        </div>

                }
                <div className=' w-full h-[70%] flex-col md:flex-row flex items-start md:overflow-y-hidden'>
                    <div className=' px-4 min-h-[200px] md:h-[90%] mb-20 w-full md:w-[60%]'>
                        <VerticalProgressBar status={status} count={count} progress={progress} courier={courier} />
                    </div>
                    <div className='p-4 w-full md:w-[40%] bg-white rounded-lg space-y-5 flex flex-col'>
                        <span className='text-lg font-bold text-gray-700 '>Grocery List</span>
                        <div className='flex flex-col md:max-h-[250px] overflow-y-auto scrollbar-sm'>
                            {
                                data.courierInfo?.cartData.map((item, indx) => {
                                    return (
                                        <GroceryItem item={item} key={indx} />
                                    )
                                })
                            }
                        </div>
                        <div className='border-t-2 border-black/5 p-5'>
                            <div>
                                <div className='w-full flex justify-between items-center'>
                                    <span className='text-md font-medium text-gray-600'>Discount</span>
                                    <span className='text-sm font-light text-gray-500'>{currency} {parseFloat(data.courierInfo.discount)}</span>
                                </div>
                                <div className='w-full flex justify-between items-center'>
                                    <span className='text-md font-medium text-gray-600'>Delivery</span>
                                    <span className='text-sm font-light text-gray-500'>{currency} {parseFloat(data.courierInfo.delivery).toFixed(2)}</span>
                                </div>
                                <div className='w-full flex justify-between items-center'>
                                    <span className='text-md font-medium text-gray-600'>Subtotal</span>
                                    <span className='text-sm font-light text-gray-500'>{currency} {(parseFloat(data.courierInfo.prize) - parseFloat(data.courierInfo.discount) - parseFloat(data.courierInfo.delivery)).toFixed(2)}</span>
                                </div>
                            </div>
                            <div className='flex justify-end space-x-4 mt-4'>
                                <span className='text-lg font-medium text-gray-700'>Paid:</span>
                                <span className='text-xl font-bold text-gray-700'>{currency}{data.courierInfo.prize}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const GroceryItem = ({ item }) => {
    const switcher = useServiceSwitch()

    return (
        <div className='w-full flex items-center space-x-3 mb-4 '>
            <div className='w-12 h-12 '><img src={item.imageUrl} className='w-full h-full object-cover rounded' /></div>
            <div className='flex flex-col'>
                <span className='font-bold text-gray-700'>{item.name}</span>
                <div>
                    {
                        !item.discount ?
                            <span className='text-gray-500'>{switcher.currency} {parseFloat(item.price).toFixed(2)} x {item.count}</span>
                            :
                            <div className='text-gray-500 space-x-2'>{switcher.currency}
                                <span className='text-gray-300 line-through'> {(parseFloat(item.price) + (item.discount / 100)).toFixed(2)}</span>
                                <span>{switcher.currency} {parseFloat(item.price).toFixed(2)} </span>
                                x {item.count}
                            </div>

                    }
                    {/* <span>{(parseFloat(item.price) * item.count).toFixed(2)}</span> */}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        fees: state.price
    }
}

export default connect(mapStateToProps, null)(OrderReceipt)