import React from 'react'
import { ArchiveIcon, BellIcon, ClipboardListIcon, HomeIcon, ScaleIcon, UserIcon } from '@heroicons/react/outline'
import { useCart } from '../../GlobalContexts/CartContext'
import { Link } from 'react-router-dom'
import CartCircle from '../CartComponent/CartCircle'

const BottomNav = () => {
    return (
        <div className='block lg:hidden absolute bottom-0 h-14 bg-white shadow-md border-black/5 border-t-2 w-full px-5' >
            <div className='relative w-full h-full flex justify-between items-center'>
                <Link to='/'><HomeIcon className='base-icon text-gray-500' /></Link>
                <Link to='/store'><ScaleIcon className='base-icon text-gray-500' /></Link>

               <CartCircle />
                <Link to='/orders'><ClipboardListIcon className='base-icon text-gray-500' /></Link>
                <Link to="/dashboard"><UserIcon className='base-icon text-gray-500' /></Link>

            </div>
        </div>
    )
}

export default BottomNav