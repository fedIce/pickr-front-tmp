import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPrice, LoadCategories } from '../../redux/actions'

const GroceryCategories = (props) => {

    const [_categories, setCategories] = useState([])
    const { categories, all = false } = props
    useEffect(() => {
        onLoad()
    }, [])

    useEffect(() => {
        if (categories.data) {
            setCategories(all? props.categories?.data : props.categories?.data.slice(0,6))
        }
    }, [categories.status])

    const onLoad = async () => {
        props.fetchCategories()
        props.fetchPrices()
    }

    return (
        <div className='w-full my-12'>
            {!all && <div className='text-center font-bold text-xl text-primary-500 py-2'>Categories</div>}
            <div className='w-full grid grid-cols-3 items-start justify-center sm:grid-cols-4 md:grid-cols-6 flex-wrap'>
                {_categories.map((item, indx) => {
                    return (
                        <CategoryCard key={indx} item={item} />
                    )
                })}
            </div>
            {!all && <div className='w-full flex justify-center'><Link to="/store/category" className='text-md cursor-pointer font-medium text-primary-500 underline underline-offset-1 '>see all</Link></div>}
        </div>
    )
}

const CategoryCard = ({ item }) => {
    return (
        <Link to={`/store/category/${item.title}`} className='mx-auto my-4 w-24 hover:scale-125 ease_transition '>
            <img src={item.image} className="w-auto mb-2 rounded object-cover" />
            <span className=' w-auto flex justify-center text-center text-sm font-bold'>{item.title}</span>
        </Link>
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
        fetchPrices: () => dispatch(getPrice('CY'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroceryCategories)