import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as Logo } from '../../assets/logo.svg'

const NavBar = () => {
    return (
        <div className='flex w-full justify-between items-center py-2 px-4'>
            <div className='flex items-center'>
                <Logo className='w-12 h-12'/>
                <span className='font-bold text-2xl text-primary-500'>Pickr</span>
            </div>
            <div className='flex items-center ml-auto space-x-4'>
                <div className='flex items-center space-x-6 text-lg font-bold text-primary-800'>
                    <span>Business</span>
                    <span>Services</span>
                    <Link to='/signin'>Sign In</Link>
                </div>
                <Link to='/signup' className='py-2 px-4 bg-primary-500 text-white font-bold rounded-full'>
                    <span>Sign Up</span>
                </Link>
            </div>
        </div>
    )
}

export default NavBar