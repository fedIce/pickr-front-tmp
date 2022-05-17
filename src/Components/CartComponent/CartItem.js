import React from 'react'
import { useServiceSwitch } from '../../GlobalContexts/ServiceSwitch'
import ProductActions from './ProductActions'

const CartItem = ({ item, index, length, showImage = false }) => {

    const { currency } = useServiceSwitch()


    return (
        <div className={`flex w-full ${index !== length - 1 && 'border-b-2'} border-black/5 p-4 justify-between items-center `}>
            <div className='w-full flex items-center space-x-4'>
                {showImage && <img src={item.imageUrl} className="w-12 h-12 rounded object-cover" />}
                <div className='flex flex-col'>
                    <div className='font-bold text-sm md:text-lg text-gray-900'>{item.name}</div>
                    <div className='flex space-x-2 items-center'>
                        <span className='font-medium text-gray-400'>{currency} {item.price.toFixed(2)}</span>
                        <span className='font-light text-gray-400'>x</span>
                        <span className='font-light text-gray-400'>{item.count}</span>
                    </div>
                </div>
            </div>
            <ProductActions item={{ ...item, prodName: item.name, prodPrice: item.price, images: [item.imageUrl] }} itemCount={item.count} relative={true} />
        </div>
    )
}

export default CartItem