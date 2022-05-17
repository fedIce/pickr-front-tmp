import { Dialog, Combobox } from '@headlessui/react'
import { HomeIcon, SearchIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import PlacesAutocomplete, {
    getLatLng,
    geocodeByAddress
} from 'react-places-autocomplete'

// const google = window.google;

const SearchAddressPallete = ({ address, open, setOpen, home = false, handleAction }) => {

    const [_address, setAddress] = useState('')

    const searchOptions = {
        // radius: 2000,
        // location: new google.maps.LatLng(34.6, 31.5),
        // types: ['address']
    }

    const getCountryStateAndRegionInfo = (result) => {
        console.log(result)
        let areaInfo = { country: null, state: null, city: null }
        if (result[0].address_components) {
            result[0].address_components.map((data) => {
                if (data.types.includes('country')) {
                    // const country = { long_name: data.long_name, short_name: data.short_name }
                    const country = data.short_name
                    areaInfo['country'] = country
                }

                if (data.types.includes('administrative_area_level_1') || data.types.includes('administrative_area_level_2') ) {
                    // const state = { long_name: data.long_name, short_name: data.short_name }
                    const state = data.long_name
                    areaInfo['state'] = state
                }

                if (data.types.includes('locality')) {
                    // const city = { long_name: data.long_name, short_name: data.short_name }
                    const city = data.long_name
                    areaInfo['city'] = city
                }

                if (data.types.includes('postal_code')) {
                    // const city = { long_name: data.long_name, short_name: data.short_name }
                    const postal_code = data.long_name
                    areaInfo['postal_code'] = postal_code
                }
            })
        }

        return areaInfo
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto"
        >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
            <PlacesAutocomplete
                value={_address}
                onChange={setAddress}
                searchOptions={searchOptions}
                shouldFetchSuggestions={_address.length > 3}
                onSelect={async (e) => {
                    const result = await geocodeByAddress(e)
                    const latlon = await getLatLng(result[0])
                    handleAction({ address: e, latlon, ...getCountryStateAndRegionInfo(result) })
                    setAddress('')
                    setOpen(false)
                }}
            >
                {(({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div
                        className='relative bg-white max-w-xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100'
                    >
                        {home && <div><HomeAddressItem place={home} active={false} /></div>}

                        <div className='flex items-center space-x-2 px-4'>
                            <SearchIcon className='w-6 h-6 text-gray-500' />
                            <input {...getInputProps({ placeholder: 'Search..' })} className="text-sm h-12 font-medium w-full bg-transparent border-0 focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400 " placeholder='Search...' />
                        </div>
                        <div className="py-4 max-h-96 overflow-y-auto scrollbar">

                            {
                                suggestions.map((suggestion, indx) => {
                                    // console.log(suggestion)
                                    return (
                                        <div {...getSuggestionItemProps(suggestion, {})} key={indx}>
                                            {

                                                <AddressItem place={suggestion} active={suggestion.active} />

                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                ))}
            </PlacesAutocomplete>
        </Dialog>
    )
}

const AddressItem = ({ place, active }) => {
    return (
        <div className={`px-4 py-2 flex justify-between items-center text-sm ${active && 'bg-purple-900 '}`}>
            <div className='flex flex-col'>
                <span className={`${active ? 'text-white' : 'text-gray-900'} text-md font-medium capitalize`}>{place.formattedSuggestion.mainText}</span>
                <span className={`${active ? 'text-purple-200' : 'text-gray-500'}  text-sm capitalize`}>{place.formattedSuggestion.secondaryText}</span>
            </div>
            {/* <span className={active ? 'text-purple-300' : 'text-gray-400'}>456 Km</span> */}
        </div>
    )
}

const HomeAddressItem = ({ place, active }) => {
    return (
        <div className={`px-4 py-2 flex justify-between items-center text-sm ${active && 'bg-purple-900 '}`}>
            <div className='flex items-center space-x-4'>
                <span><HomeIcon className='base-icon' /></span>
                <div className='flex flex-col'>
                    <span className={`${active ? 'text-white' : 'text-gray-900'} text-md font-medium capitalize`}>{place.address}</span>
                    <span className={`${active ? 'text-purple-200' : 'text-gray-500'}  text-sm capitalize`}>{place.area}</span>
                </div>
            </div>
            <span className={active ? 'text-purple-300' : 'text-gray-400'}>{place.country}</span>
        </div>
    )
}

export default SearchAddressPallete