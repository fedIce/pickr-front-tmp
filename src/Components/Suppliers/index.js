import { ChevronRightIcon } from '@heroicons/react/outline'
import { BadgeCheckIcon, SparklesIcon } from '@heroicons/react/solid'
import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { useServiceSwitch } from '../../GlobalContexts/ServiceSwitch'
import { loadProductsFromSupplier, loadSupplierByName } from '../../helper_functions'
import { LoadSupplier } from '../../redux/actions'
import ProductActions from '../CartComponent/ProductActions'
import ProductActionsAlt from '../CartComponent/ProductsActionsAlt'

const ShowSuppliers = (props) => {

    const [_supplier, setSupplier] = useState([])
    const { supplier } = props
    useEffect(() => {
        onLoad()

    }, [])



    useEffect(() => {
        if (supplier.data) {
            setSupplier(supplier?.data.slice(0, 4))
        }
    }, [supplier.status])

    const onLoad = async () => {
        props.fetchSupplier()
    }

    return (
        <div>
            <div className='font-bold text-lg text-primary-500 py-2'>Stores in <span className='text-primary-700 underline '>Lefkosia</span></div>
            <div className='w-full grid grid-cols-1 gap-1 md:grid-cols-2 min-h-fit items-start justify-around flex-wrap '>
                {_supplier.map((item, indx) => {
                    return (<SupplierCardAlt key={indx} item={item} />)
                })}
            </div>
            <div className='w-full flex justify-center'><Link to={`/store/supplier`} className='text-md cursor-pointer font-medium text-primary-500 underline underline-offset-1 '>see all</Link></div>
        </div>
    )
}

export const SupplierCard = ({ name }) => {

    const [_supplier, setSupplier] = useState([])
    useEffect(() => {
        onLoad()
    }, [])

    const onLoad = useCallback(() => {
        let sname = name.split('%20').join(' ')
        loadSupplierByName(sname).then(res => {
            setSupplier(res[0])
        })
    }, [name])

    return (
        <div className='border-b-2 border-black/5 lg:border-0 flex w-full py-4 lg:flex-col items-center justify-center lg:justify-center space-x-4 lg:items-center lg:space-y-4'>
            <img src={_supplier.image} className="h-16 lg:w-20 w-16 lg:h-20 rounded-full p-1 ring-2 ring-primary-500" />
            <div className='w-auto lg:w-[90%] flex flex-col justify-start lg:justify-center items-center lg:border-b-2 border-black/5 pb-5'>
                <div className='text-center font-bold text-lg'>{_supplier.name}</div>
                <div className='flex space-x-1 items-center'>
                    <BadgeCheckIcon className='w-5 h-5 text-blue-800' />
                    <span className='text-center font-medium text-sm text-blue-800'> People's Choice Seller</span>
                    <ChevronRightIcon className='w-5 h-5 text-blue-800' />
                </div>
            </div>
        </div>
    )
}

const SupplierCardAlt = ({ item }) => {

    const [products, setProducts] = useState(null)
    const [seeMore, setSeeMore] = useState(false)

    useEffect(() => {
        loadProductsFromSupplier(item.name).then(product => {
            setProducts([product[0], product[1]])
        })
    }, [])

    return (
        <div className='w-full my-4'>
            <div className='w-full my-5 h-[700px] relative bg-gray-50'>
                <div className='w-full h-auto md:mx-2'>
                    <div className='w-full max-h-40'>
                        <img
                            src={item.cover_photo}
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='w-full flex justify-center h-[80%] absolute top-[20%]'>
                        <div className=' w-[90%] md:w-[85%] bg-white'>
                            <div className='flex w-full flex-col py-6 p-4 md:p-6' >
                                <span className='font-bold text-2xl mb-2 '>{item.name}</span>
                                <div className={`h-fit relative`}>
                                    <div className={` ease_transition scrollbar-sm  relative w-full ${seeMore ? 'h-[200px] overflow-y-auto pb-12' : 'h-[100px] md:h-[130px]'} text-black/90 text-sm md:text-md`}>{seeMore ? item.store_description : item.store_description.slice(0, 200) + '...'}</div>
                                    <div className={`from-white to-white/30 bg-gradient-to-t flex mt-auto flex-col justify-end z-0 absolute top-0 w-full bottom-0 ${seeMore ? 'h-12' : 'h-[50%]'}`}>
                                        <div onClick={() => setSeeMore(!seeMore)} className='font-bold text-lg text-primary-500'>READ MORE</div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 w-auto'>
                                    {
                                        products?.map((prod, indx) => {
                                            return <ProductCardAlt product={prod} index={indx} key={indx} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Link to={`/store/supplier/${item.name}`} className='w-auto relative z-0 bg-primary-500 py-1 cursor-pointer text-lg text-white h-12 flex justify-center items-center'>
                <span>View All</span>
            </Link>
        </div>
    )
}

export const CategorySuppliersCard = ({ item }) => {
    return (
        <Link to={`/store/supplier/${item.name}`} className='w-auto flex space-x-2 items-center ring-2 ring-black/5 px-4 py-2 rounded-xl shadow-md cursor-pointer '>
            <div className='w-28 h-28  rounded-full '>
                <img src={item.image} className='w-full h-full rounded-full' />
            </div>
            <div className='flex flex-col'>
                <span className='font-bold text-lg'>{item.name}</span>
                <span className='text-xs text-gray-400'>• {!item.self_delivery && 'Pickr Delivery'} </span>
            </div>
        </Link>
    )
}


const ProductCardAlt = ({ product, index }) => {

    const [itemCount, setItemCount] = useState(0)
    let percentage = 0
    if (product) {
        const { discount, prodPrice } = product
        percentage = (parseFloat(discount) / parseFloat(prodPrice)) * 100
    }
    const { currency } = useServiceSwitch()
    return product && (
        <div className={`h-[200px] w-auto relative flex flex-col my-4 border-black/10 ${index === 0 ? 'border-x-2' : 'border-r-2'}`} >
            <div className='w-full py-2 '>
                <img src={product.images[0]} className='w-full h-40 object-contain' />
                {(parseFloat(product.discount) > 0) && <div className='bg-green-700 px-4 py-2 text-xs w-auto -rotate-90 absolute -left-7 top-7 font-medium text-white'>SAVE {String(parseInt(percentage))}% </div>}
            </div>
            <div className='w-full px-4 h-[80%]'>
                <div className='text-sm md:text-md font-bold'>{product.supplier} <span className='font-normal'>{product.prodName}</span> </div>
                <div>
                    <div className='flex space-x-2 my-2 items-center'>
                        <span className='w-5 md:w-6 h-5 md:h-6 rounded bg-green-500 flex justify-center items-center'><SparklesIcon className='w-4 h-4 text-white' /></span>
                        <span className='text-sm md:text-md'>Top-Rated</span>
                    </div>
                    <div className='w-full'>
                        <span className='font-bold'>{currency}{parseFloat(product.prodPrice).toFixed(2)}</span>
                        <div className='relative w-full  mt-5 bottom-0'>
                            <ProductActionsAlt item={product} itemCount={itemCount} setItemCount={setItemCount} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        supplier: state.supplier
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSupplier: () => dispatch(LoadSupplier())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowSuppliers)