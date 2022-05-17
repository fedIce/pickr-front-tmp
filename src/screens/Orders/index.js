import React, { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import GroceryDelivery from '../../Components/OrderCards/GroceryDelivery'
import { useAuth } from '../../GlobalContexts/AuthProvider'
import { DeleteRequests, LoadRequests, updateOrderStatus } from '../../redux/actions'
import { ReactComponent as NoItems } from '../../assets/noitems.svg'

import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import { ClipboardCheckIcon, ClipboardIcon, ClipboardListIcon } from '@heroicons/react/outline'
import { useOrder } from '../../Components/OrderCards/OrderContexts'
import ConfirmDelivery from '../../Components/ConfirmDelivery'
import { useAlert } from '../../GlobalContexts/ErrorContext'


const Orders = (props) => {
    let { requests } = props;
    const { user } = useAuth()
    const uid = user?.uid

    let completedOrders = useCallback(() => {
        return requests && {
            completed: [...requests].filter(r => r.status === 'delivered'),
            pending: [...requests].filter(r => r.status === 'picked_up' || r.status === 'accepted'),
            new: [...requests].filter(r => r.status === 'not_accepted')
        }
    }, [requests])

    const completed_orders = completedOrders()
    const order = useOrder()
    const alert = useAlert()

    useEffect(() => {
        // before mount
        order.changeList(order.activeList, completed_orders)
        alert.setordercount({new: completed_orders?.new.length, pending: completed_orders?.pending.length, completed: completed_orders?.completed.length})
    }, [requests])





    return (user && requests && order.list) && (
        <div className='w-full flex justify-between items-start h-[95%] bg-gray-100 md:rounded-xl md:p-5'>
            <div className='flex flex-col w-full h-full lg:w-[70%]'>
                <div className='w-full shadow-md md:shadow-none flex items-center bg-white md:bg-transparent justify-between py-2 px-4 mb-2'>
                    <div onClick={() => order.changeList('new', completed_orders)} className={` ${order.activeList === 'new' ? 'bg-primary-500 md:bg-primary-700 text-white' : 'bg-transparent text-primary-500 md:bg-primary-500 '} text-xs rounded-l-full  md:text-md cursor-pointer w-[33.33%] md:w-[25%] space-x-2 h-12 border-r-2 border-primary-500/40 md:border-0  md:rounded-full px-2 md:px-4 py-2 md:text-white font-bold flex items-center justify-center`}>
                        <ClipboardIcon className='base-icon hidden md:block text-white' />
                        <span className='hidden md:block'>New Orders</span>
                        <span className='block md:hidden'>New</span>
                        <span>{(completed_orders?.new.length > 0) && completed_orders?.new.length}</span>
                    </div>
                    <div onClick={() => order.changeList('pending', completed_orders)} className={` ${order.activeList === 'pending' ? 'bg-primary-500 md:bg-primary-700 text-white' : 'bg-transparent text-primary-500 md:bg-primary-500'} text-xs md:text-md cursor-pointer w-[33.33%] md:w-[25%] space-x-2 h-12 border-r-2 border-primary-500/40 md:border-0  md:rounded-full px-2 md:px-4 py-2 md:text-white font-bold flex items-center justify-center`}>
                        <ClipboardListIcon className='base-icon hidden md:block text-white' />
                        <span className='hidden md:block'>Orders In Progress</span>
                        <span className='block md:hidden'>In Progress</span>
                        <span>{(completed_orders?.pending.length > 0) && completed_orders?.pending.length}</span>
                    </div>
                    <div onClick={() => order.changeList('completed', completed_orders)} className={` ${order.activeList === 'completed' ? 'bg-primary-500 md:bg-primary-700 text-white' : 'bg-transparent md:bg-primary-500 text-primary-500 '} text-xs  md:text-md cursor-pointer w-[33.33%] md:w-[25%] space-x-2 h-12 md:rounded-full px-2 md:px-4 py-2  rounded-r-full md:text-white font-bold flex items-center justify-center`}>
                        <ClipboardCheckIcon className='base-icon hidden md:block text-white' />
                        <span className='hidden md:block'>Completed Orders</span>
                        <span className='block md:hidden'>Completed</span>
                        <span>{(completed_orders?.completed.length > 0) && completed_orders?.completed.length}</span>
                    </div>
                </div>
                {
                    order.list.length <= 0 ?
                        <div className='w-full h-[80%] flex justify-center flex-col items-center'>
                            <span className='w-[30%] h-[30%]'>
                                <NoItems className="w-full h-full object-cover" />
                            </span>
                            <span className='text-lg font-bold text-gray-500'>No items</span>
                        </div>
                        :
                        <div className='w-full h-full flex flex-col  items-center overflow-y-auto scrollbar-sm sm:scrollbar'>
                            {
                                [...order.list]?.sort((x, y) => y.date - x.date)?.map((request, indx) => {
                                    switch (request.courierInfo.type) {
                                        case 'shopping':
                                            return <GroceryDelivery {...props} key={indx} item={request}  />
                                        default:
                                            return null
                                    }
                                })
                            }
                            <div className='w-full h-32' />
                        </div>
                }

            </div>
            <div className='hidden lg:flex w-[28%] bg-white shadow-lg ring-1 ring-black/5 h-[98%] rounded-xl'>

            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        requests: state.firestore.ordered.DeliveryRequests,
        fs: state.firestore
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadRequests: (uid) => dispatch(LoadRequests(uid)),
        deleteRequest: (id) => dispatch(DeleteRequests(id)),
        updateStatus: (docId, status, user = null) => dispatch(updateOrderStatus(docId, status, user))
    }
}

export default compose(
    firestoreConnect(() => ['DeliveryRequests']), // or { collection: 'DeliveryRequests' }
    connect(mapStateToProps, mapDispatchToProps)
)(Orders)