import { MinusIcon, PlusIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { useCart } from '../../GlobalContexts/CartContext'
import { useServiceSwitch } from '../../GlobalContexts/ServiceSwitch'
import ProductActions from '../CartComponent/ProductActions'

const ProductCard = ({ item }) => {

    const [itemCount, setItemCount] = useState(0)


    const cart = useCart()
    const { currency } = useServiceSwitch()

    let percentage = 0
    if(item){
        const {discount, prodPrice} = item
        percentage = (parseFloat(discount)/parseFloat(prodPrice))*100
    }

    useEffect(() => {
        const inCart = cart.cart.filter(i => i.id === item.id)
        if (inCart.length > 0) {
            setItemCount(inCart[0].count)
        } else {
            setItemCount(0)
        }

    }, [cart.cart])



    return (
        <div className='w-28 h-auto mx-auto mb-5 relative'>
                {(parseFloat(item.discount) > 0) && <div className='bg-green-700 px-4 py-2 text-xs w-auto -rotate-90 absolute -left-7 top-7 font-medium text-white'>SAVE {String(parseInt(percentage))}% </div>}
            <div className='w-full h-auto' >
                <img src={item.images[0]} className="w-28 h-28 rounded object-cover" />
                <div>{currency} {parseFloat(item.prodPrice).toFixed(2)}</div>
                <div>{item.prodName}</div>
            </div>
            <ProductActions item={item} itemCount={itemCount} setItemCount={setItemCount} />
        </div>
    )
}

export default ProductCard