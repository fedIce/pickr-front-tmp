import React from 'react'
import ProfileUpdateForm from '../Product/ProfileUpdateForm'

const Main = () => {
  return (
    <div className='flex h-full justify-center overflow-auto sm:px-5'>
        <div className='w-full lg:w-[70%] h-[90%] lg:shadow-lg bg-white p-2 sm:p-5 rounded-xl'>
            <div className='w-full h-full flex overflow-y-scroll scrollbar-sm space-x-10'>         
                <ProfileUpdateForm />
            </div>
        </div>
    </div>
  )
}

export default Main