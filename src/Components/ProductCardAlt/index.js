import { MinusIcon, PlusIcon, RefreshIcon, TrashIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { useCart } from '../../GlobalContexts/CartContext'
import { useServiceSwitch } from '../../GlobalContexts/ServiceSwitch'
import ProductActionsAlt from '../CartComponent/ProductsActionsAlt'

const ProductCard2 = ({ item }) => {

    const [itemCount, setItemCount] = useState(0)


    const cart = useCart()
    const { currency } = useServiceSwitch()


    useEffect(() => {
        const inCart = cart.cart.filter(i => i.id === item.id)
        if (inCart.length > 0) {
            setItemCount(inCart[0].count)
        } else {
            setItemCount(0)
        }

    }, [cart.cart])



    return (
        <div className='w-28 h-auto relative'>
            <div className='w-full h-auto' >
                <img src={item.images[0]} className="w-28 h-28 rounded object-cover" />
                <div>{currency} {item.prodPrice}</div>
                <div>{item.prodName}</div>
            </div>
            <ProductActionsAlt item={item} itemCount={itemCount} setItemCount={setItemCount} />
        </div>
    )
}

export default ProductCard2