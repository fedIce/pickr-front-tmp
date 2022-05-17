import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import React from 'react'
import Checker from '../../../../Components/Checker'
import { Database, numberWithCommas } from '../../../../databse'

const db = new Database()

const ProductListItem = ({ product, setProducts }) => {
    const handleDelete = () => {
        setProducts(db.deleteProduct(product.id))
    }
    return (
        <div className='flex justify-between p-5 items-center hover:bg-gray-200'>
            <div className='flex space-x-4 h-20 items-center'>
                <div><Checker /></div>
                <div><img src={product.image} className="w-10 h-12 rounded object-cover" /></div>
                <div>
                    <div>{product.title}</div>
                    <div className='flex space-x-4'>
                        {product?.discount_price && <div className='text-gray-400 line-through'>₦{numberWithCommas(parseFloat(product.discount_price + product.price).toFixed(2))}</div>}
                        <div>
                            ₦{numberWithCommas(product.price)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex space-x-4 items-center self-end'>
                <span className='p-2 text-white rounded cursor-pointer bg-green-500'><PencilAltIcon className='w-5 h-5' /></span>
                <span onClick={() => handleDelete()} className='p-2 text-white rounded cursor-pointer bg-red-500'><TrashIcon className='w-5 h-5' /></span>
            </div>
        </div>
    )
}

export default ProductListItem