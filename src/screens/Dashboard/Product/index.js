import React, { useEffect, useState } from 'react'
import AddForm from './AddForm'
import { Database } from '../../../databse'
import ProductListItem from './ProductListItem'



const data_store = new Database()
let _products = data_store.getProducts()


const Products = () => {

    const [products, setProducts] = useState(_products)

    useEffect(() => {
        setProducts(data_store.getProducts())
    },[data_store.products, setProducts])

    return (
        <div className='flex h-full overflow-auto px-5'>
            <div className='w-[60%] h-full overflow-auto scrollbar-sm pb-[100px]'>
                Products
                <div className='flex flex-col'>
                    {
                        products.map((product, indx) => {
                            return <ProductListItem key={indx} product={product} setProducts={setProducts} />
                        })
                    }
                </div>
            </div>
            <div className='w-[40%] h-full overflow-auto scrollbar-sm pb-[100px]'>
                <AddForm setProducts={setProducts} />
            </div>
        </div>
    )
}


export default Products