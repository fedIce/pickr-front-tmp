import React from 'react'

const LoadingCard = () => {
    return (
        <div className='flex w-32 flex-col mb-4 p-2 rounded-lg shadow-lg space-y-2'>
            <div className='w-28 h-28 bg-gray-100 rounded-lg animate-pulse' />
            <div className='space-y-2'>
                <div className='h-4 w-full bg-gray-100 rounded animate-pulse ' />
                <div className='w-[60%] h-4 rounded bg-gray-100 animate-pulse ' />
            </div>
        </div>
    )
}

const CategoryLoadingCard = () => {
    return (
        <div className='shadow-lg rounded-xl flex-col space-y-2 flex justify-center items-center m-2 p-2'>
            <div className='w-full aspect-square bg-gray-100 animate-pulse rounded-lg' />
            <div className='w-full space-y-2'>
                <div className='w-full h-4 rounded bg-gray-100 animate-pulse ' />
                <div className='w-[60%] h-4 rounded bg-gray-100 animate-pulse ' />
            </div>
        </div>
    )
}

const SupplierLoadingCard = () => {
    return (
        <div className='shadow-lg rounded-xl space-x-2 flex justify-center items-center m-2 p-2'>
            <div className='w-28 aspect-square bg-gray-100 animate-pulse rounded-full' />
            <div className='flex-1 space-y-2'>
                <div className='w-full h-4 rounded bg-gray-100 animate-pulse ' />
                <div className='w-[60%] h-4 rounded bg-gray-100 animate-pulse ' />
            </div>
        </div>
    )
}

export {
    LoadingCard,
    CategoryLoadingCard,
    SupplierLoadingCard
}