import React, { useState } from 'react'
import moment from 'moment'
import { useServiceSwitch } from '../../../GlobalContexts/ServiceSwitch'
import { orderID } from '../../../config/validate'
import PointProgressBar from '../../UI/PointProgressBar'
import DeliveryAction from '../../DeliveryAction'
import ConfirmDelivery from '../../ConfirmDelivery'

const GroceryDelivery = (props) => {
    const { item } = props
    const { courierInfo } = item
    const { currency } = useServiceSwitch()

    const [openConfirmDelivery, setOpenConfirmDelivery] = useState(false)


    const retrieveProgress = (status) => {
        switch (status) {
            case 'not_accepted':
                return 0
            case 'accepted':
                return 33
            case 'picked_up':
                return 66
            default:
                return 100
        }
    }

    const statusMsg = [
        {
            status: 'not_accepted',
            text: 'pending',
            color: 'text-orange-400',
            message: 'order is Pending...'
        },
        {
            status: 'accepted',
            text: 'accepted',
            color: 'text-green-400',
            message: 'order has been accepted'
        },
        {
            status: 'picked_up',
            text: 'delivering',
            color: 'text-orange-400',
            message: 'your order is on the way'
        },
        {
            status: 'other',
            text: 'delivered',
            color: 'text-gray-300',
            message: 'order has finished'
        }
    ]

    const progress = retrieveProgress(item.status)

    return (
        <div className='w-[95%] h-auto p-2 md:p-4 bg-white shadow-lg ring-1 ring-black/5 rounded-xl space-y-2 my-4 '>
            <div className='flex justify-between items-center mx-4 py-4'>
                <div className='flex items-center space-x-4'>
                    <div className='w-14 h-14'>
                        <img src={require('../../../assets/grocery.png')} className="w-full h-full object-contain" />
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='font-bold text-sm md:text-lg text-gray-700'>Grocery Shopping</span>
                        {/* <span className='font-bold text-sm text-gray-400'>Order ID - {orderID(item.id)}</span> */}
                        <span className='font-bold text-xs md:text-sm text-gray-400'>{moment(item.date.toDate()).format('llll')}</span>
                    </div>
                </div>
                <div className='flex flex-col items-end space-y-1 '>
                    <DeliveryAction {...props} item={item} status={item.status} openModal={setOpenConfirmDelivery} />
                    <span className='font-bold text-sm md:text-md pt-2 md:pt-1 px-2 text-green-500'>{currency}{courierInfo.prize}</span>
                </div>
            </div>
            <div className='my-2'>
                <div className='w-full flex items-center justify-between px-5'>
                    <div className='text-lg font-bold text-primary-500'></div>
                    <div className='text-lg font-bold text-primary-500'>{item.state}</div>
                </div>
                <PointProgressBar status={statusMsg} count={progress.length} progress={progress} />
            </div>
            <ConfirmDelivery code={'677'} {...props}  open={openConfirmDelivery} setOpen={setOpenConfirmDelivery} />

        </div>
    )
}

export default GroceryDelivery