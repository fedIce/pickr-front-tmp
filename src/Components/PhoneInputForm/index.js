import { Dialog } from '@headlessui/react'
import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { preparePhoneSignInRecaptcha, resetWidgetId, signInUserWithCode, signInWithPhoneNumber } from '../../functions/phoneAuth'
import { useAlert } from '../../GlobalContexts/ErrorContext'
import PhoneOTP from '../OTPForm/PhoneOTP'

const PhoneInputForm = () => {
    const [open, setOpen] = useState(true)
    const [code, setCode] = useState('')
    const [number, setNumber] = useState('')

    const [codeSent, setCodeSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState(0)

    const alert = useAlert()

    const handleCode = (e) => {
        let value = e.target.value
        if (value[0] === '+') {
            value = value.slice(1)
        }
        setCode(`+${value}`)

    }

    const handleSignIn = () => {
        setLoading(true)
        try{
            preparePhoneSignInRecaptcha('sign-in-button', 'recaptcher-container').then((res) => {
                if(res?.error){
                    setCodeSent(null)
                    alert.setalert({title:'Recaptcha Error', body: 'Something went wrong, try again.', type:'error'})
                }
                signInWithPhoneNumber(`${code}${number}`).then((confirmationResult) => {
                    setCodeSent(confirmationResult)
                    resetWidgetId()
                }).catch((err) => {
                    console.log(err)
                }).finally(() => setLoading(false))
            })
        }catch(e){
            console.log(e)
            setLoading(false)
        }
    }

    const handleVerifyCode = (otp) => {
        if (!codeSent) return console.log('not sent')
        signInUserWithCode(otp, codeSent).then( res => {

        }).catch((e) => {
            alert.setalert({title:'Code Error', body: 'This code is Invalid or Expired', type:'error'})
        })
    }

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            className="fixed inset-0 p-4 pt-[25vh] overflow-y-auto">
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />

            {
                !codeSent ?
                    <div className="relative container mx-auto">
                        <div className="max-w-sm mx-auto md:max-w-lg">
                            <div className="w-full">
                                <div className="bg-white w-full h-72 py-3 rounded text-center">
                                    <h1 className="text-2xl font-bold">Mobile Login</h1>
                                    <div className="flex flex-col mt-4">
                                        <span>We'll send Login OTP To Your Phone </span>
                                        <span className="font-bold">you will recieve your OTP on this number</span>
                                    </div>

                                    <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                                        <input onChange={handleCode} className="m-2 border h-10 w-[20%] text-start form-control rounded px-2" type="tel" placeholder='+123' id="first" maxLength="4" value={code} />
                                        <input onChange={(e) => setNumber(e.target.value)} className="m-2 border h-10 w-[78%] text-start form-control rounded px-2" type="tel" placeholder='09966488299' id="first" maxLength="10" value={number} />
                                    </div>
                                    <div className={`w-full flex justify-center items-center my-2 mt-8 relative`}>
                                        <button onClick={() => handleSignIn()} id='sign-in-button' className={`flex w-[90%] justify-center ${loading ? 'bg-gray-400 cursor-wait' : 'hover:bg-primary-700 cursor-pointer bg-primary-500'} rounded py-4 text-center `}>
                                            {
                                                loading ?
                                                    <RefreshIcon className='base-icon text-white animate-spin' />
                                                    :
                                                    <a className="flex items-center text-white hover:text-primary-100 cursor-pointer"><span className="font-bold">Send OTP</span><i className='bx bx-caret-right ml-1'></i></a>
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='fixed bottom-20 right-20' id='recaptcher-container'></div>
                    </div>
                    :
                    <PhoneOTP otp={otp} phone={`${code}${number}`} handleVerify={handleVerifyCode} handleResend={handleSignIn} />
            }
        </Dialog>
    )
}

export default PhoneInputForm