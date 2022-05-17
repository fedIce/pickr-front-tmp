import { LoginIcon, XIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginNotice = ({ location }) => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const goBack = () => {
        navigate(-1)
    }

    return (
        <div className='fixed inset-0 bg-black/75 flex justify-center font-sans items-center'>
            <div className='max-w-lg mx-4 sm:mx-0 flex flex-col space-y-4 p-4 bg-white h-fit w-auto rounded-lg'>
                <div className='w-full flex justify-end'>
                    <div onClick={() => goBack()} className='w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded'>
                        <XIcon className='base-icon text-gray-400' />
                    </div>
                </div>
                {/* <span className='text-lg font-bold text-center'>Login To Continue </span> */}
                <span className='text-center'>You need to be logged in to do this </span>
                <Link to='/signin' state={{ from: location }} replace className={`w-full py-2 hover:bg-primary-700 flex space-x-4 justify-center rounded-lg text-white bg-primary-500 font-bold text-lg items-center `}>
                    <span>Log In</span>
                    <LoginIcon className='base-icon' />
                </Link>
            </div>
        </div>
    )
}

export default LoginNotice