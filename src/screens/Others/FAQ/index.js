import React, { useState } from 'react'
import Footer from '../../../Components/Footer'
import { faqs, menu } from './data'

const FAQ = () => {

    const [activeMenu, setActiveMenu] = useState(menu[0])

    return (
        <div className='overflow-y-auto scrollbar w-full h-full'>
            <section className="">
                <div className="container flex flex-col justify-center p-4 mx-auto md:p-8">
                    <p className="p-2 text-sm font-medium tracking-wider text-center uppercase">How it works</p>
                    <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">Frequently Asked Questions</h2>
                    <div className='w-full h-full md:flex md:divide-x-2 md:divide-black/10 space-y-5'>
                        <div className='w-[1/4] h-full max-h-fit overflow-x-auto overflow-y-hidden flex md:flex-col'>
                            {
                                menu.map((m, i) => {
                                    return (
                                        <div onClick={() => setActiveMenu(m) } className={`w-full min-w-fit px-4 py-2 hover:bg-primary-100 hover:text-white cursor-pointer text-lg font-light ${activeMenu.id === m.id && 'bg-primary-500 border-primary-700 border-l-8 text-white font-medium'} `}>{m.title}</div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex flex-1 flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-gray-700">
                            {
                                faqs.filter(n => n.menu_id === activeMenu.id).map((faq, indx) => {
                                    return (
                                        <details key={indx}>
                                            <summary className="py-2 outline-none cursor-pointer focus:underline">{faq.title}</summary>
                                            <div className="px-4 pb-4">
                                                <p dangerouslySetInnerHTML={{ __html: faq.description }} />
                                            </div>
                                        </details>
                                    )
                                })
                            }

                        </div>

                    </div>
                </div>
            </section>
            <Footer/>
            <div className='w-full h-32'/>
        </div>
    )
}

export default FAQ