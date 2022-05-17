import { ChevronDownIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import CustomDropList from '../CustomDropList'
import { paymentListOptions } from '../../screens/Cart/data'


const PaymentMode = (props) => {
    const {setMode, disabled} = props
    const [paymentOption, setPaymentOption] = useState(paymentListOptions[0].value)

    const handlePaymentMode = (mode) => {
        setMode(mode)
        setPaymentOption(mode)
    }
    return (
        <div>
            <CustomDropList title="Payment Mode" listOptions={paymentListOptions} handleSelect={handlePaymentMode} disabled={disabled} />
        </div>
    )
}


export default PaymentMode