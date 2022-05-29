import React, { useEffect, useState } from 'react'
import { auth } from '../../../config/firebase'
import { useAuth } from '../../../GlobalContexts/AuthProvider'
import { useAlert } from '../../../GlobalContexts/ErrorContext'
import {ReactComponent as Loader} from '../../../assets/spinner.svg'
import { useNavigate } from 'react-router-dom'
const vemail = require('../../../assets/vemail.gif')

const VerifyEmail = () => {
    const user = useAuth()
    const alert = useAlert()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(auth.currentUser.emailVerified){
            navigate('/dashboard')
        }
    },[auth.currentUser.emailVerified])

    const sendEmailVerification = () => {
        (async () => {
            setLoading(true)
            await auth.currentUser.sendEmailVerification()
        })().then(() => {
            alert.setalert({ title: 'Verification Email Sent', body: `A new verification email has been sent to your email @${user.user.email}`, type: 'success' })
        }).catch((e) => {
            alert.setalert({ title: 'Verification Email Not Sent', body: `An error occured while send verification email : ${JSON.stringify(e)}`, type: 'error' })
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className='fixed inset-0 bg-black/75 flex justify-center font-sans items-center'>
            <div className='max-w-xl flex-col mx-2 xs:mx-4 sm:mx-8 md:mx-0 sm:flex-row flex flex-1 bg-white h-fit w-auto rounded-lg'>
                <div className='w-full sm:w-[40%]'>
                    <img src={vemail} className="w-full h-full object-contain rounded-lg" />
                </div>
                <div className='w-full sm:w-[60%] flex flex-col items-center justify-center p-4'>
                    <div className='flex flex-col space-y-2 text-center'>
                        <span className='text-lg font-bold'>Hi {user.user.displayName},</span>
                        <span className='text-sm'>Thank you for trying out Pickr for your deliveries</span>
                        <span className='text-xs'>Check your Email @{user.user.email} for your email verification Link </span>
                        <span className='text-xs'>and click on the link to verify your email</span>
                    </div>
                    <div className='mt-5'>
                        <div onClick={() => sendEmailVerification()} className={`w-full ${loading? 'cursor-wait bg-gray-400 text-gray-500':'hover:bg-green-800 cursor-pointer bg-green-600 text-white'} px-4 text-sm font-bold  py-2 rounded-lg `}>
                            {!loading && <span>Re-send Email Verification</span>}
                            {loading && <div className='flex items-center space-x-4'> <span>Loading</span> <Loader className='w-4 h-4' /></div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail