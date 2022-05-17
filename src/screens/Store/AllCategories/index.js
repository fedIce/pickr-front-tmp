import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { LoadCategories } from '../../../redux/actions'

const AllCategories = (props) => {
    const [_categories, setCategories] = useState(null)
    const { categories, fetchCategories } = props
    useEffect(() => {
        loadCategories().then(() => {
        })
    }, [])

    useEffect(() => {
        setCategories(categories.data)
    }, [categories])

    const loadCategories = async () => {
        await fetchCategories()
    }

    return (
        <div>
            <div className='mb-5'>
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
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-wrap'>
                {
                    _categories?.map((item, indx) => {
                        return <CategoryCardAlt data={item} key={indx} />
                    })
                }
            </div>
        </div>
    )
}

const CategoryCardAlt = ({ data }) => {
    return (
        <div className='shadow-lg rounded-xl flex flex-col justify-between m-2 p-2'>
            <div className='w-auto rounded-lg overflow-hidden'>
                <img src={data.image} className='w-full h-full object-cover' />
            </div>
            <div className='flex w-full justify-center items-center py-3'>
                <span className='text-md text-gray-700 font-bold'>{data.title}</span>
            </div>
            <Link to={`/store/category/${data.title}`} className='w-full h-10 mt-auto bg-primary-500 rounded-lg text-white font-bold flex justify-center items-center'>
                <span>View Items</span>
            </Link>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(LoadCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)