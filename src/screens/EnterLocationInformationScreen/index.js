import { LocationMarkerIcon } from '@heroicons/react/outline'
import React from 'react'
import AddressSearchComboField from '../../Components/Address/AddressSearchField'
import Loader from '../../Components/Loader'
import GoogleMapUI, { PlaceHolder } from '../../Components/MapUI'



const EnterLocationInformationScreen = (props) => {

    let { user } = props
    user = user.user

    const user_address = user?.delivery_address ? user.delivery_address.address: null

    return (
        <div className='w-full h-full lg:w-[100%] lg:h-[90vh] ring-2 p-1 bg-gray-100 ring-black/10 shadow-lg flex relative md:rounded-2xl overflow-hidden'>
            {/* <Loader/> */}
            <GoogleMapUI />
            <div className='flex w-[80%] xl:w-[60%] items-center mx-auto bg-white rounded-full px-4 absolute top-2 left-[20%] space-x-2 shadow-lg '>
                <LocationMarkerIcon className='w-6 h-6 text-primary-900' />
                <div className='h-10 w-full text-primary-900 flex items-center overflow-hidden px-4'><span className=' whitespace-nowrap overflow-hidden overflow-ellipsis text-sm md:text-md'>{user_address ? user_address : "Deliver to this address"}</span></div>
            </div>
            <div className='absolute flex bottom-0 w-full h-auto mx-auto'>
                <div className='flex justify-center items-center relative w-full h-auto'>
                    <div className='w-full p-5 h-[150px]'>
                        <AddressSearchComboField user_address={user_address} {...props} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export const AddressComboFieldPort = (props) => {
    let { user } = props
    user = user.user

    const user_address = user?.delivery_address ? user.delivery_address.address: null

    return <AddressSearchComboField user_address={user_address} {...props} />
}

export default EnterLocationInformationScreen