import { Dialog, Combobox } from '@headlessui/react'
import { XIcon, HashtagIcon, QrcodeIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import ShowCode from '../OTPForm/ShowCode'
import QrScanner from '../QrScanner'

const ConfirmDelivery = (props) => {

    const { code, open, setOpen, updateStatus, item } = props

    const [mode, setMode] = useState('qrcode')
    const [loading, setLoading] = useState(false)

   

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto"
        >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />

            <Combobox
                as="div"
                className='relative max-w-md bg-white h-fit mx-auto rounded-xl shadow-2xl ring-1 ring-black/5 divide-y divide-gray-100'
                onChange={() => {
                    // TODO: Do Action
                }}
            >
                <div className='w-full flex flex-col justify-center relative items-center bg-white p-5 rounded-xl'>
                    <div className='w-full h-auto'>
                        {mode === 'qrcode' && <QrScanner setLoading={setLoading} {...props} />}
                        {mode === 'number' && <ShowCode  {...props} title='Your Order Code' subtitle='Give code to courier to verify your reciept' />}
                    </div>
                    <div className='w-full flex items-center h-12 justify-around my-2'>
                        <div onClick={() => setMode('qrcode')} className='cursor-pointer w-[33.33%] h-[80%] items-center flex justify-center'>
                            <span><QrcodeIcon className='base-icon text-gray-300' /></span>
                        </div>
                        <div onClick={() => setMode('number')} className='cursor-pointer w-[33.33%] h-[80%] items-center border-l-2 border-r-2 border-black/10 flex justify-center'>
                            <span><HashtagIcon className='base-icon text-gray-300' /></span>
                        </div>
                        <div onClick={() => setOpen(false)} className='cursor-pointer w-[33.33%] h-[80%] items-center flex justify-center'>
                            <span><XIcon className='base-icon text-gray-300' /></span>
                        </div>
                    </div>
                </div>
            </Combobox>
        </Dialog>
    )
}

export default ConfirmDelivery