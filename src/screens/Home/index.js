import { ChevronRightIcon, MenuAlt1Icon } from '@heroicons/react/outline'
import React, { useEffect, useRef, useState } from 'react'
import GroceryCategories from '../../Components/GroceryCategories'
import ShowSuppliers from '../../Components/Suppliers'
import NavBar from '../../Components/NavBar'
import EnterLocationInformationScreen, { AddressComboFieldPort } from '../EnterLocationInformationScreen'
import { connect } from 'react-redux'
import { setUserData } from '../../redux/actions'
import CartCircle from '../../Components/CartComponent/CartCircle'
import { useCart } from '../../GlobalContexts/CartContext'
import Footer from '../../Components/Footer'
import ThreeStepDelivery from '../../Components/ThreeStepDelivery'
import { Link } from 'react-router-dom'

const Home = (props) => {
    const cart = useCart()

    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0)
    const scrollRef = useRef()

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    }, [])

    const listenToScroll = () => {
        let heightToHideFrom = 20;
        const winScroll = scrollRef.current.scrollTop;
        setHeight(winScroll);

        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };



    return (
        <div ref={scrollRef} onScroll={listenToScroll} className='flex w-full h-full relative overflow-x-hidden overflow-y-auto scrollbar-sm md:scrollbar'>
            <div className='w-full md:p-5 lg:pr-8 xl:relative xl:w-[60%]'>
                <div className='xl:hidden md:rounded-lg relative w-full h-[100vh] bg-fixed bg-[#fbc910]'>
                    <img src={require('../../assets/coverimg.png')} className='w-full rotate-180 absolute bottom-0 ' />

                    <div className='w-full h-full flex flex-col justify-center items-center absolute'>

                        <div className='w-full md:max-w-lg mb-5 h-[60%] flex flex-col justify-end px-4'>
                            <div className='flex flex-col my-5'>
                                <span className='text-xl font-sans font-bold'>Delivering To Your Door Front.</span>
                                <span className='text-xl font-sans font-light'>Delivering On Time</span></div>
                            <div className='w-full'>
                                <AddressComboFieldPort {...props} />
                            </div>
                            <Link to='/store' className='flex w-full  justify-center h-12 bg-primary-500 text-white shadow-md space-x-4 rounded-xl my-5 mt-8 items-center'>
                                <span className='text-lg font-bold'>Start Shopping</span>
                                <ChevronRightIcon className='w-6 h-6 stroke-1' />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='xl:fixed absolute left-0 w-[55%] z-0 ml-10 flex justify-end xl:block '>
                    <div className={` ease_transition ${isVisible ? 'opacity-100' : 'opacity-0'} hidden w-full bg-white  xl:block xl:absolute top-0`} >
                        <NavBar />
                    </div>
                    <div className={`${isVisible ? 'opacity-100' : 'opacity-0'} md:p-4 fixed top-5 right-5 w-12 h-12 rounded-full bg-primary-900 md:m-4 justify-center items-center flex xl:hidden`}>
                        <div className='md:p-1 bg-white rounded-md'>
                            <MenuAlt1Icon className='w-4 h-4 text-primary-500' />
                        </div>
                    </div>
                </div>

                <div className='w-full xl:pt-20'>
                    {/* <Carousel/> */}
                    <GroceryCategories />
                    <ThreeStepDelivery />
                    <ShowSuppliers />
                </div>
                <div className='w-full h-24'> </div>
                <Footer />
            </div>
            <div className='hidden xl:block w-[35%] fixed right-12 '>
                <EnterLocationInformationScreen {...props} />
            </div>
            <div className='fixed bottom-5 hidden lg:block left-10'>
                {cart.cart.length > 0 && <CartCircle bounce={true} />}
            </div>
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (data) => dispatch(setUserData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)