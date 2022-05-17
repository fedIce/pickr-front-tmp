import { Listbox, Transition } from '@headlessui/react'
import { SelectorIcon } from '@heroicons/react/outline'
import React, { Fragment, useState } from 'react'

export const DashboardFormDropDownList = ({ list, selectedInterval, setSelectedInterval, name }) => {

    return (
        <div className='text-xs w-auto text-textcolor flex flex-1 relative'>
            <Listbox
                value={selectedInterval} onChange={setSelectedInterval}>
                <Listbox.Button
                    className="relative flex justify-between items-center w-full text-left  rounded-lg cursor-default focus:outline-none 
                    focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 
                    focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-xs"
                >
                    <div className='w-full'>
                        <div className='w-auto py-2 px-4 m-2 my-5 border-2 border-gray-300 rounded-xl flex flex-col text-sm text-textcolor'>
                            <div className='flex items-center justify-between'>
                                <span className='font-medium text-md'>{name}</span>
                                <SelectorIcon className='guide-icon w-5 h-5' />
                            </div>
                            <span className='pt-1 outline-none w-full'>{selectedInterval?.title}</span>
                        </div>
                    </div>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 max-w-2xl
                  ring-black ring-opacity-5 focus:outline-none sm:text-xs text-textcolor"
                    >
                        {list?.map((i) => (
                            <Listbox.Option
                                key={i.id}
                                value={i}
                                disabled={i.unavailable}
                                className={({ active, disabled }) =>
                                    `cursor-default select-none relative py-2 px-3 pr-4 ${active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                    } ${disabled && 'text-light_textcolor'}`}
                            >
                                {i.value}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    )
}

