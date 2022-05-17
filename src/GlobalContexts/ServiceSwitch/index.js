import React, { createContext, useContext, useState } from 'react'


const service = {
    service: null,
    currency: null,
    changeCurrency: () => null,
    assignService: () => null
}

const ServiceSwitchContext = createContext(service)

const ServiceSwitch = ({children}) => {
    // const services = ['store', 'delivery', 'taxi']
    const [service, setService] = useState('store')
    const [currency, setCurrency] = useState('₺')

    const assignService = (value = null) => {
        // use redux store to switch services
        if(value){
            setService(value)
            return
        }
    }

    const changeCurrency =(value) => {
        setCurrency(value)
    }


    const value = {assignService, currency, changeCurrency, service}

  return (
    <ServiceSwitchContext.Provider value={value}>{children}</ServiceSwitchContext.Provider>
  )
}

export const useServiceSwitch = () => useContext(ServiceSwitchContext)

export default ServiceSwitch