import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import QrReader from 'react-web-qr-reader';
import { useAlert } from '../../GlobalContexts/ErrorContext';
import { _retrieveNextStatus } from '../DeliveryAction/funs';

const QrScanner = (props) => {
    const { item, setLoading, updateStatus } = props;
    const alert = useAlert()
    const delay = 500;

    const updateItem = async () => {
        setLoading(true)
        await updateStatus(item.id, _retrieveNextStatus(item.status))
    }
    const handleUpdateItem = () => {
        updateItem().then(() => {
            setTimeout(() => {
                alert.setalert({ title: "Congratulations!!, You verified your delivery", type:'notice', body: "Kudos, you just completed a delivery with Pickr. Thank you!. Also please leave a review to rate your experience." })
                setLoading(false)
            }, 1000)
        })
    }

    const previewStyle = {
        height: '100%',
        width: '100%',
    };

    const [result, setResult] = useState(null);

    const handleScan = (result) => {
        if (result.data === item.uniqueOrderCode) {
            handleUpdateItem()
        }
    };

    const handleError = (error) => {
        alert.setalert({ title: "Permission Denied", body: "Pickr can not access your camera on this device, try granting access and try again. \n Else you can also use the PIN verification" })
        alert.settype('warning')
        console.log(error);
    };

    return (
        <div className='w-full h-full'>
            <QrReader
                delay={delay}
                facingMode="environment"
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
        </div>
    );
};
export default QrScanner;

