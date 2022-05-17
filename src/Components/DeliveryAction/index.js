import { QrcodeIcon, RefreshIcon, XIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { useAlert } from '../../GlobalContexts/ErrorContext'
import { _retrieveNextStatus } from './funs'



const CancelDelivery = (props) => {
    const { deleteRequest, item } = props
    const [loading, setLoading] = useState(false)
    const alert = useAlert()

    const deleteItem = async () => {
        setLoading(true)
        await deleteRequest(item.id)
    }

    const handleDelete = () => {
        deleteItem().then(() => {
            setTimeout(() => {
                alert.setalert({ title: "Deleted", body: `order has been deleted successfully`, type:'notice'  })
                setLoading(false)
            }, 1000)
        })
    }

    return (
        <div onClick={() => handleDelete()} className='ease_transition cursor-pointer active:scale-75 py-2 px-4 text-sm md:text-md rounded-full shadow-md font-medium text-white text-md flex items-center space-x-2 bg-red-600'>
            <span>Cancel</span>
            {loading ? <RefreshIcon className='w-4 h-4 md:base-icon text-white animate-spin ' /> : <XIcon className=' w-4 h-4 md:base-icon text-white' />}
        </div>
    )
}

const DeliveredPackage = () => {
    return (
        <div className='py-2 px-4 text-sm md:text-md font-medium text-gray-300 text-md flex items-center space-x-2'>
            <span>Delivered</span>
        </div>
    )
}

const DeliveringPackage = () => {
    return (
        <div className='py-2 px-4 text-sm md:text-md font-medium text-orange-500 text-md flex items-center space-x-2'>
            <span>Delivering...</span>
        </div>
    )
}

const RecieveDelivery = (props) => {

    const { updateStatus, item, openModal } = props
    const [loading, setLoading] = useState(false)


    const handleUpdateItem = () => {
        openModal(true)
    }

    return (
        <div onClick={() => handleUpdateItem()} className='ease_transition cursor-pointer active:scale-75 py-2 px-3 sm:px-4 text-xs md:text-md rounded-full shadow-md font-medium text-white text-md flex items-center space-x-2 bg-orange-400'>
            <span className='hidden sm:block'>Confirm Delivery</span>
            <span className='block sm:hidden'>Confirm</span>
            {loading ? <RefreshIcon className='w-4 h-4 md:base-icon text-white animate-spin ' /> : <QrcodeIcon className=' w-4 h-4 md:base-icon text-white' />}
        </div>
    )
}

const DeliveryAction = (props) => {
    const { status } = props

    switch (status) {
        case 'not_accepted':
            return <CancelDelivery {...props} />
        case 'accepted':
            return <DeliveringPackage />
        case 'picked_up':
            return <RecieveDelivery {...props} />
        default:
            return <DeliveredPackage />
    }
}

export default DeliveryAction