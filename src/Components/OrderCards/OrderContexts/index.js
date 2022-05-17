import React, { createContext, useContext, useState } from 'react'

const initialOrder = {
    list: null,
    activeList: null,
    changeList: () => null,
    setActiveList: () => null
}

const OrderContext = createContext(initialOrder)

const OrderProvider = ({ children }) => {

    const [activeList, setActiveList] = useState('new')
    const [list, setList] = useState([])


    const changeList = (option, completed_orders) => {
        setActiveList(option)
        switch (option) {
            case 'new':
                setList(completed_orders?.new)
                return
            case 'pending':
                setList(completed_orders?.pending)
                return
            case 'completed':
                setList(completed_orders?.completed)
                return
            default:
                return null
        }
    }

   


    const value = { list, activeList, changeList, setActiveList }

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}

export const useOrder = () => useContext(OrderContext)

export default OrderProvider