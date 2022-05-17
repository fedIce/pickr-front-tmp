import React, { useState } from 'react'
import CustomDropList from '../CustomDropList'
import { listOptions } from '../../screens/Cart/data'

const DeliveryMode = (props) => {

    const { setMode, disabled } = props


    const [deliveryOption, setDeliveryOption] = useState(listOptions[0].value)

    const handleSetDeliveryMode = (mode) => {
        if (mode === 'Standard') {
            setMode({ price: 1, mode: 'Standard' })
        } else if (mode === 'Delux') {
            setMode({ price: 50, mode: 'Delux' })
        } else if (mode === 'Premium') {
            setMode({ price: 100, mode: 'Premium' })
        }

        setDeliveryOption(mode)
    }

    return (
        <div>
            <CustomDropList title="Delivery Mode" listOptions={listOptions} handleSelect={handleSetDeliveryMode} disabled={disabled} />
        </div>
    )
}


export default DeliveryMode