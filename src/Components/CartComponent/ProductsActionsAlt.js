import { PlusIcon, TrashIcon, MinusIcon, RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { useCart } from '../../GlobalContexts/CartContext'

const ProductActionsAlt = ({ item, itemCount, setItemCount = null, relative = false }) => {

    const [loading, setLoading] = useState(false)
    const cart = useCart()

    const cartActions = (type) => {
        const cartData = {
            imageUrl: item.images[0],
            name: item.prodName,
            price: parseFloat(item.prodPrice),
            extra: item.desc,
            pid: item.id
        }
        console.log(cartData)
        setLoading(true)
        if (type == 'add') {
            if (parseFloat(item.discount) > 0) {
                cartData['discount'] = parseFloat(item.discount)
            }
            cart.addItemToCart({ ...cartData, id: item.id, count: itemCount + 1 })
            setItemCount && setItemCount(itemCount + 1)
        } else if (type == 'remove') {
            cart.removeItemFromCart(item.id)
            setItemCount && setItemCount(itemCount - 1)
        } else if (type == 'update-add') {
            cart.updateCart(item.id, 'count', itemCount + 1)
            setItemCount && setItemCount(itemCount + 1)
        } else if (type == 'update-remove') {
            cart.updateCart(item.id, 'count', itemCount - 1)
            setItemCount && setItemCount(itemCount - 1)
        }
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    return (
        <div className={`ease_transition ${itemCount > 0 ? 'w-full' : 'w-10 md:w-12'} flex justify-between items-center ${!relative ? 'absolute top-0 -right-4' : 'relative'}  bg-primary-100 rounded-full overflow-hidden `}>


            {itemCount > 0 && <div onClick={() => cartActions(itemCount <= 1 ? 'remove' : 'update-remove')} className='h-10 md:w-12 w-10 md:h-12 flex justify-center items-center bg-primary-500'>
                {

                    itemCount <= 1 ?
                        <TrashIcon className='base-icon text-white' />
                        :
                        <MinusIcon className='base-icon text-white' />
                }
            </div>}
            {itemCount > 0 && <div className='text-bold'> {loading ? (<RefreshIcon className='base-icon text-primary-500 animate-spin ' />) : itemCount} </div>}

            <div onClick={() => cartActions(itemCount <= 0 ? 'add' : 'update-add')} className='h-10 md:w-12 w-10 md:h-12 flex justify-center items-center bg-primary-500'>
                <PlusIcon className='base-icon text-white' />
            </div>


        </div>
    )
}

export default ProductActionsAlt