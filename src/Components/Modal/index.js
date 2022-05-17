import { Dialog } from '@headlessui/react'
import React from 'react'

const Modal = ({ open, setOpen, children }) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className="fixed inset-0 p-4 pt-[10vh] sm:pt-[25vh] overflow-y-auto">
                <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
                <div className='relative bg-white max-w-xl mx-auto rounded-xl shadow-2xl ring-1 ring-black/5'>
                    {children}
                </div>
            </Dialog>
        </div>
    )
}

export default Modal