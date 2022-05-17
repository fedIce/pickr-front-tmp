import React from 'react'

const ThreeStepDelivery = () => {
    return (
        <div className='px-4 my-10'>
            <div className='flex flex-col items-center mb-4'>
                <span className='text-lg font-bold font-sans'>HOW IT WORKS?</span>
                <span className='text-md font-sans text-center'>Using Pickr for your delivery comes down to 3 simple steps.</span>
            </div>
            <div className='grid items-center grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-8'>
                <div className='flex justify-center'>
                    <div className='flex flex-col items-start'>
                        <div className='w-32 h-32'><img src={require('../../assets/b1.png')} className='w-full h-full' /></div>
                        <div className='flex flex-col items-start max-w-md'>
                            <span className='text-md font-sans font-semibold mt-4 mb-2'>Place An Order</span>
                            <span className='flex flex-col font-sans text-sm'>
                                <span>1. browse our stores and find something you like.</span>
                                <span>2. add it to your cart</span>
                                <span>3. enter your delivery information </span>
                                <span>4. and place your order.</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='flex flex-col items-start max-w-md'>
                        <div className='w-32 h-32'><img src={require('../../assets/b3.png')} className='w-full h-full' /></div>
                        <div className='flex flex-col items-start'>
                            <span className='text-md font-sans font-semibold mt-4 mb-2'>Track Your Order.</span>
                            <span className='flex flex-col font-sans text-sm'>
                                <span>1. get notified on the status of your order.</span>
                                <span>2. wait for your order to be delivered.</span>
                                <span>3. pay in cash. <b>Pickr doesn't allow for card payments at this time.</b>.</span>
                                <span>4. contact the assigned Pickr if your order is taking too long. </span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center '>
                    <div className='flex flex-col items-start max-w-md'>
                        <div className='w-32 h-32'><img src={require('../../assets/b2.png')} className='w-full h-full' /></div>
                        <div className='flex flex-col items-start'>
                            <span className='text-md font-sans font-semibold mt-4 mb-2'>Confirm Your Delivery</span>
                            <span className='flex flex-col font-sans text-sm'>
                                <span>1. when your order arrives, scan your Pickr's bar-code to confirm you recieved and are satisfied with the order.</span>
                                <span>2. recieve your order reciept in your email.</span>
                                <span>3. if something isn't right, contact Pickr using your order ID </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThreeStepDelivery