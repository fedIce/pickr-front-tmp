import { HomeIcon, LocationMarkerIcon, SearchIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchAddressPallete from '../../CommandPalletes/SearchAddressPallete'


const addresses = [
    {
        address: 'The full address of the locatio',
        area: 'The state, city, and country',
        distance: 234.44
    },
    {
        address: 'The full address of the locatio',
        area: 'The state, city, and country',
        distance: 234.44
    },
    {
        address: 'The full address of the locatio',
        area: 'The state, city, and country',
        distance: 234.44
    },
    {
        address: 'The full address of the locatio',
        area: 'The state, city, and country',
        distance: 234.44
    }
]

export const AddressSearchComboField = (props) => {

    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState(addresses)
    const [isHomeAddress, setIsHomeAddress] = useState(true)
    let { user, setUser, user_address } = props
    user = user.user
    const homeAddress = user?.address ? {
        address: user.address,
        city: user.city,
        country: user.country,
        latlon: { longitude: user.extra?.longitude, latitude: user.extra?.latitude }
    } : null

    useEffect(() => {
        if (homeAddress) {
            setUser({ ...user, delivery_address: homeAddress, isHomeAddress: isHomeAddress })
        }
    }, [])

    const searchPlaces = async (address) => {
        if (address.address) {
            setIsHomeAddress(false)
            setUser({ ...user, delivery_address: address, isHomeAddress: !isHomeAddress })
        }
    }


    const deliverToHomeAddress = () => {
        if (homeAddress) {
            setIsHomeAddress(true)
            setUser({ ...user, delivery_address: homeAddress, isHomeAddress: isHomeAddress })
        } else {
            navigate('/signin', { state: { from: '/' }, replace: true })
        }
    }

    return (
        <div className='bg-white rounded-3xl shadow-2xl ring-1 ring-black/5 max-w-xl mx-auto h-28 py-2 '>
            <SearchAddressPallete home={homeAddress} handleAction={searchPlaces} address={search} open={isOpen} setOpen={setIsOpen} />
            <div className='flex w-full h-full justify-between '>
                <div className='divide-y w-[80%] h-full flex flex-col justify-between divide-primary-300 '>
                    <div className='flex items-center space-x-2 px-4'>
                        <LocationMarkerIcon className='w-6 h-6 text-primary-900' />
                        <div className='h-12 w-full text-primary-400 flex items-center font-light overflow-hidden'
                            onClick={() => {
                                setIsOpen(!isOpen)
                            }} ><span className='whitespace-nowrap overflow-ellipsis'>{(user_address && !isHomeAddress) ? user_address : "Deliver to this address"}</span></div>
                    </div>
                    <div onClick={() => deliverToHomeAddress()} className='flex items-center space-x-2 px-4'>
                        <HomeIcon className='w-6 h-6 text-primary-900' />
                        <div className='h-12 w-full text-primary-900 text-sm md:text-md whitespace-nowrap overflow-hidden flex items-center font-medium' ><span className='w-full overflow-clip text-clip'>{(homeAddress && isHomeAddress) ? homeAddress.address : 'Deliver to my home address'}</span></div>
                    </div>
                </div>
                <div className='flex h-full w-[20%] justify-center items-center'>
                    <div className='flex justify-center items-center h-12 w-12 rounded-xl bg-primary-500/50'>
                        <SearchIcon className='w-6 h-6 text-primary-900' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddressSearchComboField