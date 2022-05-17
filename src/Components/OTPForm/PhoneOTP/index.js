import React, { useEffect, useState } from 'react'
import { useCountdown } from '../../CountDownHook'

const TWO_MINS_IN_MS = 1 * 1 * 3 * 60 * 1000;
const NOW_IN_MS = new Date().getTime();

const PhoneOTP = (props) => {

    const timeAfterTwoMins = NOW_IN_MS + TWO_MINS_IN_MS;
    const [days, hours, minutes, seconds] = useCountdown(timeAfterTwoMins);




    const { otp, phone, handleVerify, handleResend } = props
    let [verification, setVerification] = useState(['', '', '', '', '', ''])

    const handleInput = (e, id) => {
        let value = [...verification]
        value[id] = e.target.value
        setVerification(value.join(''))
        let text = parseInt(value.join(''))
        if (value.join('').trim().length === 6) {
            handleVerify(text)
        }
    }
    let _text = null;

    const showTimer = days + hours + minutes + seconds <= 0

    return (
        <div className="relative container mx-auto">
            <div className="max-w-sm mx-auto md:max-w-lg">
                <div className="w-full">
                    <div className="bg-white min-h-fit py-3 rounded text-center">
                        <h1 className="text-2xl font-bold">OTP Verification</h1>
                        <div className="flex flex-col mt-4">
                            <span>Enter the OTP you received at</span>
                            <span className="font-bold">{phone.slice(0, 3)} ******{phone.slice(-3)}</span>
                        </div>

                        <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                            <input onChange={(e) => handleInput(e, 0)} className="m-2 border h-10 w-10 text-center form-control rounded" type="text" value={verification[0]} id="first" maxLength="1" />
                            <input onChange={(e) => handleInput(e, 1)} className="m-2 border h-10 w-10 text-center form-control rounded" type="text" value={verification[1]} id="second" maxLength="1" />
                            <input onChange={(e) => handleInput(e, 2)} className="m-2 border h-10 w-10 text-center form-control rounded" type="text" value={verification[2]} id="third" maxLength="1" />
                            <input onChange={(e) => handleInput(e, 3)} className="m-2 border h-10 w-10 text-center form-control rounded" type="text" value={verification[3]} id="fourth" maxLength="1" />
                            <input onChange={(e) => handleInput(e, 4)} className="m-2 border h-10 w-10 text-center form-control rounded" type="text" value={verification[4]} id="fifth" maxLength="1" />
                            <input onChange={(e) => handleInput(e, 5)} className="m-2 border h-10 w-10 text-center form-control rounded" type="text" value={verification[5]} id="sixth" maxLength="1" />
                        </div>

                        <div className="flex justify-center text-center mt-5">
                            {
                                !showTimer ?
                                    <div>
                                        <span className='w-[60%] inline-block text-center war text-sm font-md text-gray-400'>didn't get this SMS?, try checking your phone number again</span>
                                        <span className='w-[60%] inline-block text-center war text-sm font-md text-gray-400'>or you can send another code in <span className='font-bold'> {minutes} : {seconds} </span> minutes</span>
                                    </div>
                                    :
                                    <div onClick={handleResend} className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhoneOTP