import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../../Components/ProductCard'
import { loadAllProducts, loadProductsFromCategory, loadProductsFromSupplier } from '../../../helper_functions'

const SupplierStore = (props) => {
    const [_products, setProducts] = useState(null)

    const { supplier, category = null } = useParams()

    useEffect(() => {
        getProducts(supplier, category)
    }, [supplier, category])

    const getProducts = useCallback((supplier, category) => {
        if (supplier) {
            loadProductsFromSupplier(supplier, category).then((results) => {
                setProducts(results)
            })

        } else {
            loadAllProducts().then((results) => {
                setProducts(results)
            })
        }

    }, [supplier, category])




    return _products && (
        <div className='flex flex-col lg:flex-row w-full h-fit'>
            <div className='grid grid-cols-2 h-fit w-[100%] justify-around sm:grid-cols-3 md:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-4 lg:border-r-2 border-black/5 '>
                {
                    _products?.map((item, indx) => {
                        return (
                            <ProductCard key={indx} item={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}



export default SupplierStore