import React, { useMemo, useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import CartComponent from '../../Components/CartComponent'
import CategoryDropMenu from '../../Components/CategoryDropMenu'
import Loader from '../../Components/Loader'
import { SupplierCard } from '../../Components/Suppliers'
import { loadAllProducts } from '../../helper_functions'
import { LoadSupplier } from '../../redux/actions'
import Main from './Main'

const Store = (props) => {
    const [_products, setProducts] = useState(null)
    const [_supplier, setSupplier] = useState(null)
    const [categories, setCategories] = useState(null)
    const [activePath, setActivePath] = useState(null)

    const { id } = useParams()
    const location = useLocation()
    const { pathname } = location

    useEffect(() => {
        if (pathname.includes('supplier/')) {
            setActivePath(pathname.split('/')[4]?.split('%20').join(' '))
        } else if (pathname.includes('category/')) {
            setActivePath(pathname.split('/')[3]?.split('%20').join(' '))
        }
        getAllCategories(true)
    }, [id, pathname])

    const getAllCategories = useCallback(async (onlyCats) => {
        loadAllProducts(onlyCats).then((cats) => {
            setCategories(cats)
        })
    }, [])



    return categories ? (
        <div className='flex flex-col lg:flex-row w-full h-full'>
            <CategoryDropMenu categories={categories} pathname={pathname} activePath={activePath} />
            <div className='flex w-full lg:w-[20%] mt-20 lg:mt-2 flex-col items-center lg:border-r-2 border-black/5 space-y-4'>
                {pathname.includes('supplier/') && <SupplierCard name={pathname.split('/')[3]} />}
                <div className='w-full hidden lg:block px-2 overflow-y-auto scrollbar h-full'>
                    {/* move to own component`` */}
                    <span className='w-full py-2 flex flex-col px-4 text-xl font-bold mb-6 text-primary-500 underline underline-offset-1'>Categories</span>

                    {categories?.map((i, index) => {
                        return (
                            <Link to={`${pathname.includes('supplier/') ? `/store/supplier/${pathname.split('/')[3]}/${i}` : `/store/category/${i}`}`} className={`w-full ${activePath === i && 'bg-primary-500 text-white'} inline-block py-2 px-4 hover:bg-primary-100 rounded cursor-pointer`} key={index}>
                                <span className='font-medium'>{i}</span>
                            </Link>
                        )
                    })}
                    <div className='w-full h-16' />
                </div>
            </div>
            <div className='w-full lg:w-[55%] overflow-y-auto scrollbar  pb-10'>
                {pathname === '/store' ? <Main /> : <Outlet />}
            </div>
            <div className='hidden lg:flex w-[25%] h-auto'>
                <CartComponent />
            </div>
        </div>
    ) : <Loader />
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

export default connect(mapStateToProps, mapDispatchToProps)(Store)