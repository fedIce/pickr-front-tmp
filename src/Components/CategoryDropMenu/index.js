import { Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CategoryDropMenu = ({ categories, pathname, activePath }) => {
    const [open, setOpen] = useState(false);
    return (

        <div className='w-full block divide-y-2 divide-black/5 absolute z-10 bg-white shadow-lg lg:hidden px-2 overflow-y-auto scrollbar h-fit pb-5'>
            <div className='w-full flex items-center px-2 justify-between py-2'>
                <span className='text-lg font-bold'>{activePath ? activePath : 'All'}</span>
                <span onClick={() => setOpen(!open)}><ChevronDownIcon className='base-icon' /></span>
            </div>
            <Transition
                show={open}
                enter="ease_transition"
                enterFrom='opacity-0 h-0'
                enterTo='opacity-100 h-auto'
                className='w-full h-auto'>
                {categories?.map((i, index) => {
                    return (
                        <Link onClick={() => setOpen(!open)} to={`${pathname.includes('supplier/') ? `/store/supplier/${pathname.split('/')[3]}/${i}` : `/store/category/${i}`}`} className={`w-full ${activePath === i && 'bg-primary-500 text-white'} inline-block py-2 px-4 hover:bg-primary-100 rounded cursor-pointer`} key={index}>
                            <span className='font-medium'>{i}</span>
                        </Link>
                    )
                })}
            </Transition>
        </div>
    )
}

export default CategoryDropMenu