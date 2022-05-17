import { HomeIcon, LocationMarkerIcon, PencilAltIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import SearchAddressPallete from '../../CommandPalletes/SearchAddressPallete'
import { address } from '../../../screens/Cart/data'
import { Link, useNavigate } from 'react-router-dom'

const CheckoutConfirmAddress = (props) => {
    const navigate = useNavigate()
    const [_user, setUser] = useState(null)
    const [open, setOpen] = useState(false)

    let { user, updateUser } = props
    user = user.user

    const user_address = user?.delivery_address ? user.delivery_address?.address : 'No Address Entered'
    const homeAddress = user?.isHomeAddress ? user.isHomeAddress : null

    const deliverToHomeAddress = (result) => {
        console.log(result)
        updateUser({ ...user, delivery_address: result })
    }

    return (
        <div className='w-full m-2 bg-primary-500/20 p-4 my-4 mb-8 justify-between rounded flex items-center'>
            <SearchAddressPallete home={homeAddress} handleAction={deliverToHomeAddress} open={open} setOpen={setOpen} />
            <div className='flex items-center w-full space-x-2'>
                <span>
                    {
                        user?.isHomeAddress ?
                            <HomeIcon className='base-icon text-primary-500' />
                            :
                            <LocationMarkerIcon className='base-icon text-primary-500' />
                    }
                </span>
                <span className='font-medium text-md text-gray-700 w-full pr-5 whitespace-nowrap overflow-hidden overflow-ellipsis'>{user_address}</span>
                <div onClick={() => setOpen(true)} className='cursor-pointer'><PencilAltIcon className='w-4 h-4 hover:scale-150 text-gray-700' /></div>
            </div>
        </div>
    )
}

export default CheckoutConfirmAddress