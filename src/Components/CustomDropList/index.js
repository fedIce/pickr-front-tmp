import React, { useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Transition } from '@headlessui/react'

const CustomDropList = (props) => {

    const { title, listOptions, handleSelect, disabled = false } = props

    const [selected, setSelected] = useState(listOptions[0])
    const [openOption, setOpenOption] = useState(false)

    const selectOption = (indx) => {
        setSelected(listOptions[indx])
        handleSelect(listOptions[indx].value)
        setOpenOption(false)
    }

    return (
        <div className='relative w-full h-16'>
            <div className='flex justify-between items-center'>
                <div className='flex flex-col justify-start space-y-1'>
                    <span className='text-lg font-bold text-primary-500'>{title}</span>
                    <span className='text-sm text-gray-400'>{selected.title}</span>
                </div>
                {
                    !disabled &&
                    <div onClick={() => setOpenOption(!openOption)}>
                        <ChevronDownIcon className='base-icon text-gray-300' />
                    </div>
                }
            </div>
            <Transition
                show={openOption} className='absolute z-10 top-16 w-full bg-gray-100 rounded shadow-lg'
                enter='ease_transition'
                enterFrom="h-[0%] opacity-0"
                enterTo="h-auto opacity-100"
                leave="ease_transition"
                leaveFrom="h-auto opacity-100"
                leaveTo="h-[0%] opacity-0"
            >
                <div className='flex flex-col p-4'>
                    {
                        listOptions.map((option, indx) => {
                            return <ListItem key={indx} index={indx} title={option.title} body={option.body} last={indx === (listOptions.length - 1)} action={selectOption} />
                        })
                    }
                </div>
            </Transition>
        </div>
    )
}


const ListItem = ({ title, body, last = false, action, index }) => {

    return (
        <div onClick={() => action(index)} className={`w-full ${!last && ' border-b-2 border-black/5'} hover:bg-gray-400/75 cursor-pointer text-gray-400 hover:text-white p-2 rounded`}>
            <div className='flex flex-col py-2 px-4'>
                <span className='text-md font-medium '>{title}</span>
                <p className='text-justify font-light text-sm '>{body}</p>
            </div>
        </div>
    )
}

export default CustomDropList