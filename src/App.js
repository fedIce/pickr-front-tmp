import { Route, Routes, useLocation } from 'react-router-dom';
import AuthProvider from './GlobalContexts/AuthProvider';
import Signin from './screens/Auth/Signin';
import Signup from './screens/Auth/Signup';
import { RequireNoAuth } from './GlobalContexts/RequireNoAuth';
import { connect } from 'react-redux';
import { RequireAuth } from './GlobalContexts/RequireAuth';
import Cart from './GlobalContexts/CartContext';
import ServiceSwitch from './GlobalContexts/ServiceSwitch';
import Home from './screens/Home';
import Store from './screens/Store';
import BottomNav from './Components/BottomNav';
import CartScreen from './screens/Cart';
import TopNav from './Components/TopNav';
import Orders from './screens/Orders';
import AlertProvider from './GlobalContexts/ErrorContext';
import firebase, { auth } from './config/firebase';
import { useEffect, useState } from 'react';
import Loader from './Components/Loader';
import Dashboard from './screens/Dashboard';
import OrderProvider from './Components/OrderCards/OrderContexts';
import PhoneInputForm from './Components/PhoneInputForm';
import CategoryStore from './screens/Store/CategoryStore';
import SupplierStore from './screens/Store/SupplierStore';
import ShowSuppliers from './Components/Suppliers';
import AllCategories from './screens/Store/AllCategories';
import AllSuppliers from './screens/Store/AllSuppliers';
import Main from './screens/Dashboard/Main';
import DeliveryInformation from './screens/Others/DeliveryInformationPage';
import FAQ from './screens/Others/FAQ';
import VerifyEmail from './screens/Auth/VerifyEmail';
import LoginNotice from './Components/LoginNotice';

function App(props) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()

    useEffect(() => {
        const unsubscribe = () => auth.onAuthStateChanged(async (user) => {
            setLoading(true)
            setTimeout(() => {
                if (user) {
                    setLoading(false)
                    return setUser(user.uid)
                } else {
                    setLoading(false)
                    return setUser(null)
                }
            }, 1000)
        })

        return () => unsubscribe()

    }, [user])

    const removeInnerPadding = !location.pathname.includes('/dashboard')

    return (
        <AlertProvider>
            <div className="w-full h-screen overflow-hidden relative">
                <div className='inset-0 h-screen md:p-5 bg-primary-500'>
                    <div className={`bg-white relative md:rounded-2xl ${removeInnerPadding && 'pb-16 sm:pb-10 lg:pb-0 '} w-full h-full overflow-hidden `}>
                        {
                            !loading ?
                                <AuthProvider _user={user}>
                                    <Cart>
                                        <TopNav />
                                        <div className={`w-full h-full ${removeInnerPadding && 'md:p-5'}`}>
                                            <ServiceSwitch>
                                                <Routes>
                                                    <Route path="/" element={<Home />} />
                                                    <Route path="/verify_email" element={<VerifyEmail />} />
                                                    <Route path="/store/:id" element={<Store />} />
                                                    <Route path="/store" element={<Store />} >{/* ----*/}
                                                        <Route path="/store/category" element={<AllCategories/>} />
                                                        <Route path="/store/supplier" element={<AllSuppliers  />} />{/* ----*/}
                                                        <Route path="/store/category/:id" element={<CategoryStore />} />{/* ----*/}
                                                        <Route path="/store/supplier/:supplier/:category" element={<SupplierStore />} />
                                                        <Route path="/store/supplier/:supplier" element={<SupplierStore />} />
                                                    
                                                    </Route>
                                                    <Route path="/delivery_info" element={<DeliveryInformation />} />
                                                    <Route path="/faq" element={<FAQ />} />
                                                    <Route path="/cart" element={<CartScreen />} />
                                                    <Route path="/orders" element={
                                                        <RequireAuth>
                                                            <OrderProvider>
                                                                <Orders />
                                                            </OrderProvider>
                                                        </RequireAuth>
                                                    } />

                                                    <Route path="/signin" element={
                                                        <RequireNoAuth>
                                                            <Signin />
                                                        </RequireNoAuth>
                                                    } />

                                                    <Route path="/phone" element={<PhoneInputForm />} />

                                                    <Route path="/signup" element={
                                                        <RequireNoAuth>
                                                            <Signup />
                                                        </RequireNoAuth>
                                                    } />
                                                    <Route path="/dashboard" element={
                                                        <RequireAuth>
                                                            <Dashboard />
                                                        </RequireAuth>
                                                    } >
                                                        <Route path="/dashboard/main" element={<Main/>} />
                                                    </Route>
                                                </Routes>
                                            </ServiceSwitch>
                                        </div>
                                        <BottomNav />
                                    </Cart>
                                </AuthProvider>
                                :
                                <Loader />
                        }
                    </div>
                </div>

            </div >
        </AlertProvider>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
}


export default connect(mapStateToProps, null)(App)

