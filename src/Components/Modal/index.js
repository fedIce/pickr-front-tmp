import { Dialog } from '@headlessui/react'
import React from 'react'

const Modal = ({ open, setOpen, children }) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="fixed inset-0 p-4 flex items-center overflow-y-auto">
                <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
                <div className='relative bg-white max-w-4xl w-full max-h-[95vh] mx-auto rounded-xl shadow-2xl ring-1 ring-black/5'>
                    {children}
                </div>
            </Dialog>
        </div>
    )
}

export default Modal