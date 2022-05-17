import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { SupplierLoadingCard } from '../../../Components/LoadingCard'
import { CategorySuppliersCard } from '../../../Components/Suppliers'
import { LoadSupplier } from '../../../redux/actions'

const AllSuppliers = (props) => {
    const [suppliers, setSuppliers] = useState(null)
    const { loadSuppliers, supplier } = props;

    useEffect(() => {
        onLoad()
    }, [])

    useEffect(() => {
        setSuppliers(supplier.data)
    }, [supplier])

    const onLoad = async () => {
        await loadSuppliers()
    }

    return (
        <div className='w-full h-auto'>
            <div>
                <div className='flex mx-2 w-auto justify-between px-4 py-2 shadow-md items-center rounded-xl bg-[#ffefb8]'>
                    <div className='w-auto space-y-4'>
                        <div className='flex flex-col '>
                            <span className='text-md md:text-xl font-medium text-gray-700'>Food delivery from your favourite local chefs</span>
                            <span className='text-sm md:text-md text-gray-700'>is coming to Pickr. excited?. </span>
                        </div>
                        <div className='bg-green-500 cursor-pointer text-sm sm:text-md text-white w-32 px-4 py-2 rounded-xl font-bold'>Get Notified</div>
                    </div>
                    <div className='w-auto'>
                        <img src={require('../../../assets/chef.png')}
                            className='w-44 h-44 object-contain ' />
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <div>
                    <span className=' px-4 text-xl text-gray-700 font-bold'>Suppliers</span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-2 py-4'>
                    {
                        suppliers ?
                            suppliers?.map((item, indx) => {
                                return <CategorySuppliersCard item={item} key={indx} />
                            })
                            :
                            [...(new Array(4))].map((_, indx) => {
                                return <SupplierLoadingCard key={indx} />
                            })
                    }
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
        loadSuppliers: () => dispatch(LoadSupplier())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSuppliers)