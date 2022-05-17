import { BellIcon, SearchIcon } from '@heroicons/react/outline'
import React from 'react'

const DashboardHeader = ({user}) => {
  return (
    <div className='w-full h-16 flex items-center justify-between'>
        <div className='px-5 py-3 text-3xl flex space-x-2 text-gray-600 font-semibold'>
            <span className='font-light'>Welcome,</span>
            <span>{user?.displayName}</span>
        </div>
        <div className='flex items-center space-x-4'>
            <div className='w-auto h-10 py-2 px-5 bg-gray-100 flex justify-between items-center space-x-4 rounded-tl-xl rounded-br-xl relative'>
                <input className='w-32 h-[70%] bg-transparent outline-none' placeholder='search...' />
                <SearchIcon className='w-5 h-5 text-gray-500' />
            </div>
            <div className='w-10 h-10 bg-gray-100 flex justify-center items-center rounded-tl-xl rounded-br-xl relative'>
                <BellIcon className='w-5 h-5 text-gray-500' />
                <span className='w-2 h-2 bg-red-600 rounded-full aspect-square absolute top-2.5 right-2.5'></span>
            </div>
            <div className='w-10 h-10 bg-gray-100 flex justify-center items-center rounded-tl-xl rounded-br-xl relative overflow-hidden'>
                <img src="https://cdnb.artstation.com/p/assets/images/images/034/457/389/large/shin-min-jeong-.jpg?1612345145" className='w-full h-full object-cover' />
            </div>
            <div></div>
        </div>
    </div>
  )
}

export default DashboardHeader