import { ChevronLeftIcon, ClipboardListIcon, MenuAlt1Icon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAlert } from '../../GlobalContexts/ErrorContext'
import CartCircle from '../CartComponent/CartCircle'
import UserCircle from '../UserCircle'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import SlideInMenu from '../SlideInMenu'


const TopNav = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const alert = useAlert()

    const [openSideBar, setOpenSideBar] = useState(false)

    const show = location.pathname !== '/'
    return show && (
        <div className='w-full flex justify-between items-center mb-2 px-2 relative top-0 h-14  bg-white border-b-2 border-black/10 shadow-md'>
            <div className='cursor-pointer ' onClick={() => navigate(-1)}>
                <ChevronLeftIcon className='h-10 w-10 text-primary-500' />
            </div>
            <div className='hidden lg:block'>
                <Link to="/" className='flex items-center'>
                    <Logo className='w-12 h-12' />
                    <span className='font-bold text-2xl text-primary-500'>Pickr</span>
                </Link>
            </div>
            <div className='hidden lg:flex items-center space-x-4'>
                <Link to="/orders" className='flex items-center space-x-2 cursor-pointer '>
                    <span><ClipboardListIcon className='base-icon text-primary-500' /></span>
                    <span className='text-primary-500 font-bold text-md'>Orders</span>
                    {alert.orderCounts.pending > 0 ? <span className='font-bold text-sm p-2 text-white h-6 w-6 flex justify-center items-center rounded-full bg-red-500'>{alert.orderCounts?.pending}</span> : null}
                </Link>
                <div className='hidden lg:flex items-center space-x-2 cursor-pointer '>
                    <CartCircle pushtop={false} />
                </div>
                <UserCircle />
            </div>
            <div onClick={() => setOpenSideBar(!openSideBar) } className='cursor-pointer lg:hidden '>
                <MenuAlt1Icon className='h-10 w-10 text-primary-500' />
            </div>
            <SlideInMenu open={openSideBar} setOpen={setOpenSideBar} /> 
        </div>
    )
}

export default TopNav