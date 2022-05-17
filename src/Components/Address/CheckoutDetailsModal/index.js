import { Dialog } from '@headlessui/react'
import { InformationCircleIcon, PencilAltIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../GlobalContexts/AuthProvider'
import Modal from '../../Modal'

const CheckoutDetailsModal = ({ open, setOpen, auth }) => {

    const user = useAuth()
    const address = auth?.user?.delivery_address

    return auth.user && (
        <div>
            <Modal open={open} setOpen={setOpen}>
                <div className='w-full h-auto flex flex-col justify-center divide-y-2 divide-black/5'>
                    <div className='w-full py-2 flex justify-center'>
                        <span className='text-gray-700 uppercase font-bold'>Checkout Details</span>
                    </div>
                    <div className='w-full p-4'>
                        <div className='w-auto my-4 border-dashed border-b-2 border-black/5 pb-4 sm:pb-6'>
                            <div className='flex justify-between '>
                                <span className='font-thin text-gray-400 text-lg'>Address </span>
                                {/* <span ><PencilAltIcon className='w-4 h-4' /></span> */}
                            </div>
                            <div className='mt-2 px-4'>

                                <div className='pb-4 sm:pb-0 flex flex-col sm:grid sm:grid-cols-2 '>
                                    <span className='text-gray-700 font-semibold'>Delivery Address:</span>
                                    {address?.address ?
                                        <span className='text-gray-500 '>{address?.address}</span> :
                                        <div className='relative w-auto inline-flex items-center'>
                                            <span className='text-red-500 '>not provided </span>
                                            <Ping />
                                        </div>
                                    }
                                </div>


                                <div className='pb-4 sm:pb-0 flex flex-col sm:grid sm:grid-cols-2'>
                                    <span className='text-gray-700 font-semibold'>City</span>
                                    {address?.city ?
                                        <span className='text-gray-500 '>{address?.city}</span> :
                                        <div className='relative w-auto inline-flex items-center'>
                                            <span className='text-red-500 '>not provided </span>
                                            <Ping />
                                        </div>
                                    }
                                </div>


                                <div className='pb-4 sm:pb-0 flex flex-col sm:grid sm:grid-cols-2'>
                                    <span className='text-gray-700 font-semibold'>Country</span>
                                    {address?.country ?
                                        <span className='text-gray-500 '>{address.country}</span> :
                                        <div className='relative w-auto inline-flex items-center'>
                                            <span className='text-red-500 '>not provided </span>
                                            <Ping />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='w-auto my-4 pb-4 sm:pb-6'>
                            <div className='flex justify-between '>
                                <span className='font-thin text-gray-400 text-lg'>Contact</span>
                                {/* <span ><PencilAltIcon className='w-4 h-4' /></span> */}
                            </div>
                            <div className='mt-2 px-4'>
                                <div className='pb-4 sm:pb-0 flex flex-col sm:grid sm:grid-cols-2'>
                                    <span className='text-gray-700 font-semibold'>Phone</span>
                                    {auth?.user.phone ?
                                        <span className='text-gray-500 '>{auth.user.phone}</span> :
                                        <div className='relative w-auto inline-flex items-center'>
                                            <span className='text-red-500 '>not provided </span>
                                            <Ping />
                                        </div>
                                    }
                                </div>
                                <div className='pb-4 sm:pb-0 flex flex-col sm:grid sm:grid-cols-2'>
                                    <span className='text-gray-700 font-semibold'>E-mail</span>
                                    {auth?.user?.email?
                                        <span className='text-gray-500 '>{auth.user?.email}</span> :
                                        <div className='relative w-auto inline-flex items-center'>
                                            <span className='text-red-500 '>not provided </span>
                                            <Ping />
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                        <Link to='/dashboard' state={{from:'checkout_dialog'}} >
                            <div className='text-xs flex space-x-2 justify-center py-2 text-gray-400 '> <InformationCircleIcon className='w-4 h-4 text-orange-400 ' /> <span>the highlighted information are required to fufill your order </span></div>
                            <div className='text-white py-2 w-auto bg-green-500 flex justify-center font-bold rounded-lg'>EDIT</div>
                        </Link>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const Ping = () => {
    return (
        <span className="flex h-3 w-3 relative ml-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutDetailsModal)