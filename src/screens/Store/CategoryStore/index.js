import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingCard } from '../../../Components/LoadingCard'
import NoItemsFound from '../../../Components/NoItemsFound'
import ProductCard from '../../../Components/ProductCard'
import { loadAllProducts, loadProductsFromCategory } from '../../../helper_functions'

const CategoryStore = (props) => {
    const [_products, setProducts] = useState(null)

    const { id } = useParams()

    useEffect(() => {
        getProducts(id)
    }, [id])

    const getProducts = useCallback((id) => {
        if (id) {
            loadProductsFromCategory(id).then((results) => {
                setProducts(results)
            })

        } else {
            loadAllProducts().then((results) => {
                setProducts(results)
            })
        }

    }, [id])




    return (
        <div className='w-full h-fit'>
            <div className='grid grid-cols-2 w-[100%] h-fit sm:grid-cols-3 md:grid md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 px-4 lg:border-r-2 border-black/5 '>
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
            {(_products && _products.length <= 0) && <div className='w-full '><NoItemsFound /></div>}

        </div>
    )
}



export default CategoryStore