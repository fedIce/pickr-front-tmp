import React, { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { auth } from '../../config/firebase'
import DashboardHeader from './DashboardComponents/DashboardHeader'
import SideBar from './DashboardComponents/SideBar'

const Dashboard = () => {
    const [openSB, setOpenSB] = useState(false)
    const location = useLocation()
    const user = auth?.currentUser
    let at_dash = location.pathname === "/dashboard"
    const hasFallBack = location.state ? location.state.from.state?.from.pathname : null
    const atDashboardWithoutFallback = !hasFallBack && at_dash

    return (
        <div className='relative w-full h-[95%] lg:h-[90%] md:px-5 flex justify-center items-center inset-0 overflow-hidden bg-white'>
            {atDashboardWithoutFallback ? <Navigate to="main" /> : at_dash ? <Navigate to={hasFallBack} /> : null}
            <div className={`${openSB ? 'w-[15%]' : 'w-[5%]'} ease_transition hidden lg:block h-full mt-10`}>
                <SideBar open={openSB} setOpen={setOpenSB} />
            </div>
            <div className='flex-1 h-[95%] rounded-3xl lg:bg-primary-100 overflow-hidden'>
                <div className='flex h-full w-full sm:mt-5'>
                    <div className='flex-1 h-full sm:px-5 overflow-hidden relative'>
                        {/* <DashboardHeader user={user.user} /> */}
                        <Outlet />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Dashboard