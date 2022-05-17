import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingCard } from '../../../Components/LoadingCard'
import NoItemsFound from '../../../Components/NoItemsFound'
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




    return (
        <div className='w-full h-fit'>
            {(_products && _products.length <= 0) && <div className='w-full '><NoItemsFound /></div>}
            <div className='grid grid-cols-2 h-fit w-[100%] justify-around sm:grid-cols-3 md:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-4 lg:border-r-2 border-black/5 '>
                {
                    _products ?
                        _products?.map((item, indx) => {
                            return (
                                <ProductCard key={indx} item={item} />
                            )
                        })
                        :
                        [...(new Array(15))].map((_, indx) => {
                            return <LoadingCard key={indx} />
                        })

                }
            </div>
        </div>
    )
}



export default SupplierStore