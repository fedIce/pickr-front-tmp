import React, { useEffect, useState } from 'react'

const OTPForm = (props) => {
    const { showResend = false, title = '', subtitle = '', example = '', item } = props;
    const [code, setCode] = useState(['','','','','',''])

    const handleSetCode = async (e, indx) => {
        code[indx]  = e.target.value
        setCode(code)
        if(code.join('') === item.uniqueOrderPIN ){
            console.log('DONE!!')
        }
        console.log(code.join(''), e.target.value)
    }

    useEffect(() => {
        console.log(code)
    },[code])


    return (
        <div class="h-full px-3">
            <div class="container mx-auto">
                <div class="max-w-sm mx-auto md:max-w-lg">
                    <div class="w-full">
                        <div class="bg-white h-64 py-3 rounded text-center">
                            <h1 class="text-2xl font-bold">{title}</h1>
                            <div class="flex flex-col mt-4">
                                <span>{subtitle}</span>
                                <span class="font-bold mt-2">{example}</span>
                            </div>

                            <div id="otp" class="flex flex-row justify-center text-center px-2 mt-5">
                                <input onChange={(e) => handleSetCode(e, 0)} class="mx-1 sm:m-2 border h-10 w-10 text-center form-control rounded" type="text" id="first" maxlength="1" />
                                <input onChange={(e) => handleSetCode(e, 1)} class="mx-1 sm:m-2 border h-10 w-10 text-center form-control rounded" type="text" id="second" maxlength="1" />
                                <input onChange={(e) => handleSetCode(e, 2)} class="mx-1 sm:m-2 border h-10 w-10 text-center form-control rounded" type="text" id="third" maxlength="1" />
                                <input onChange={(e) => handleSetCode(e, 3)} class="mx-1 sm:m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fourth" maxlength="1" />
                                <input onChange={(e) => handleSetCode(e, 4)} class="mx-1 sm:m-2 border h-10 w-10 text-center form-control rounded" type="text" id="fifth" maxlength="1" />
                                <input onChange={(e) => handleSetCode(e, 5)} class="mx-1 sm:m-2 border h-10 w-10 text-center form-control rounded" type="text" id="sixth" maxlength="1" />
                            </div>

                            {showResend &&
                                <div class="flex justify-center text-center mt-5">
                                    <a class="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span class="font-bold">Resend OTP</span><i class='bx bx-caret-right ml-1'></i></a>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTPForm