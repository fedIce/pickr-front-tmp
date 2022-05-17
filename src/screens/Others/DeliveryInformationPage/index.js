import React from 'react'
import Footer from '../../../Components/Footer'
import { useServiceSwitch } from '../../../GlobalContexts/ServiceSwitch'
import { delivery_info } from './data'

const DeliveryInformation = () => {

    const { currency } = useServiceSwitch()

    return (
        <div className='w-full h-full overflow-y-auto scrollbar font-sans text-gray-700'>
            <div className='my-4'>
                <h2 className='text-2xl font-sans font-bold text-primary-500 px-2'>About Pickr Grocery Delivery</h2>
            </div>
            <section className='px-4 py-2'>
                <div className='mt-2'>
                    <h4 className='text-xl font-semibold font-sans'>Home Delivery Areas</h4>
                </div>
                <div>
                    <span className='my-2 font-light text-lg '>We deliver to many or most addresses in the following Regions In the TRNC:</span>
                    <ul className='space-y-1 list-item list-inside my-2 mt-4 text-sm list-disc'>
                        <li className='flex flex-col sm:grid sm:grid-cols-5 my-2 sm:space-x-2'><span className='font-bold col-start-1 col-span-1 '>Lefkosia:</span><span className='col-span-4'> Küçük Kaymaklı, Ortaköy, Hamitköy, Haspolat, Taşkınköy, Yenişehir, Kızılay, Marmara, Göçmenköy
                            Köşklüçiftlik, Aydemet, Kumsal, Yenicami, Çağlayan.</span></li>
                        <li className='flex flex-col sm:grid sm:grid-cols-5 my-2 sm:space-x-2'><span className='font-bold col-span-1 '>Gonyeli</span></li>
                        <li className='flex flex-col sm:grid sm:grid-cols-5 my-2 sm:space-x-2'><span className='font-bold col-start-1 col-span-1 '>Girne:</span> <span className='col-span-4'>Coming Soon</span></li>
                        <li className='flex flex-col sm:grid sm:grid-cols-5 my-2 sm:space-x-2'><span className='font-bold col-start-1 col-span-1 '>Famagusta:</span> <span className='col-span-4'>Coming Soon</span></li>
                        <li className='flex flex-col sm:grid sm:grid-cols-5 my-2 sm:space-x-2'><span className='font-bold col-start-1 col-span-1 '>Lefke:</span> <span className='col-span-4'>Coming Soon</span></li>
                        <li className='flex flex-col sm:grid sm:grid-cols-5 my-2 sm:space-x-2'><span className='font-bold col-start-1 col-span-1 '>iskele:</span> <span className='col-span-4'>Coming Soon</span></li>
                        <li className='flex flex-col sm:grid sm:grid-cols-5 my-2 sm:space-x-2'><span className='font-bold col-start-1 col-span-1 '>Güzelyurt:</span> <span className='col-span-4'>Coming Soon</span></li>
                    </ul>
                </div>
                <div className='text-sm my-4 italic'>To check if Pickr Delivery currently covers your area, <a className='text-primary-500 underline' href="#">Click Here</a></div>
                <div>
                    <div className="container p-2 mx-auto mt-5 rounded-md sm:p-4 dark:text-coolGray-100 dark:bg-coolGray-900">
                        <h2 className="mb-3 text-xl font-semibold leading-tight">Home Delivery Fees</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs">
                                <thead className="rounded-t-lg">
                                    <tr className="text-right">
                                        <th title="Area" className="p-3 text-left">Area</th>
                                        <th title="Min. Order" className="p-3 text-left">Min. Order</th>
                                        <th title="Delivery Fee" className="p-3">Delivery Fee</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        delivery_info.map((info, i) => {
                                            return (
                                                <tr className="text-right border-b border-opacity-20 dark:border-coolGray-700 dark:bg-coolGray-800">
                                                    <td className="px-3 py-2 text-left">
                                                        <span>{info.title}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-left">
                                                        <span>{currency} {parseFloat(info.min_order).toFixed(2)}</span>
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <span>{currency} {parseFloat(info.fee).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default DeliveryInformation