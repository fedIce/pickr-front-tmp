import React, { createContext, useContext, useEffect } from 'react'
import Error from '../../Components/Alerts/Error';
import TopAccentBorderNotice from '../../Components/Alerts/TopAccentBorderNotice';
import WarningAccentBorder from '../../Components/Alerts/WarningAccentBorder';
import useSound from 'use-sound';
import PopIn from '../../assets/popsound.wav';
import SimpleSuccessAlert from '../../Components/Alerts/SimpleSuccessAlert';

const initialError = {
    alert: null,
    setalert: () => null,
    closealert: () => null,
    type: null,
    settype: () => null,
    orderCounts: null,
    setordercount: () => null,
}

const AlertContext = createContext(initialError);


const AlertProvider = ({ children }) => {

    const [alert, setAlert] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [allAlerts, setAllAlerts] = React.useState([])
    const [orderCounts, setOrderCount] = React.useState({ new: 0, pending: 0, completed: 0 })

    const [playin] = useSound(
        PopIn,
        { volume: 0.2 }
    )

    useEffect(() => { }, [allAlerts])

    let closealert = () => {
        setTimeout(() => {
            const msg = Array.from(allAlerts)
            msg.shift()
            setAllAlerts(msg)
        }, 6000)
    }

    let setalert = (value) => {
        if (allAlerts?.length > 0) {
            setAlert(value)
            setAllAlerts([...allAlerts, value])
        } else {
            setAllAlerts([value])
        }
        closealert()
    }

    let settype = (value) => {
        setType(value)
    }


    const ShowAlert = ({ item, indx }) => {

        const closeItem = (isTrue) => {
            if (allAlerts) {
                const msg = Array.from(allAlerts)
                msg.pop(indx)
                setAllAlerts(msg)
            }
        }
        switch (item?.type) {
            case 'error':
                return <Error title={item.title} body={item.body} action={closeItem} />
            case 'warning':
                return <WarningAccentBorder title={item.title} body={item.body} />
            case 'notice':
                playin()
                return <TopAccentBorderNotice title={item.title} body={item.body} />
            case 'success':
                playin()
                return <SimpleSuccessAlert title={item.title} body={item.body} />
            default:
                return null
        }
    }

    const setordercount = (count) => {
        setOrderCount({ ...orderCounts, ...count })
    }

    let value = { alert, setalert, closealert, type, settype, setordercount, orderCounts };

    return (
        <AlertContext.Provider value={value}>
            <div className='w-full h-full relative'>
                {allAlerts.length > 0 &&
                    <div className='absolute sm:fixed  space-y-4 bottom-20 mx-4 sm:right-20 z-50'>

                        {

                            allAlerts.map((item, indx) => {
                                return <ShowAlert key={indx} item={item} indx={indx} />
                            })
                        }
                    </div>}
                {children}
            </div>
        </AlertContext.Provider>
    )
}

export const useAlert = () => useContext(AlertContext);

export default AlertProvider