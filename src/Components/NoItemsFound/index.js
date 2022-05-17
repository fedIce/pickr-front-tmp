import React from 'react'

const NoItemsFound = () => {
    return (
        <div className='w-full h-full flex flex-col justify-center items-center'>
            <div className='w-[70%] aspect-square'><img src={require('../../assets/not_found.png')} className='w-full h-full object-contain' /></div>
            <div className='flex flex-col items-center justify-center space-y-2 font-sans'>
                <span className='font-bold'>No Items</span>
                <span className='font-light'>no items in this category</span>
            </div>

        </div>
    )
}

export default NoItemsFound