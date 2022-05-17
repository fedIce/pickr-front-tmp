import React, { useEffect, useState } from 'react'

const ShowCode = (props) => {
    const { showResend = false, title = '', subtitle = '', example = '', item } = props;
    const [code, setCode] = useState(['','','','','',''])

    useEffect(() => {
        setCode(Array.from(item.uniqueOrderPIN))
    },[])


    return (
        <div className="h-full px-3">
            <div className="container mx-auto">
                <div className="max-w-sm mx-auto md:max-w-lg">
                    <div className="w-full">
                        <div className="bg-white h-64 py-3 rounded text-center">
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <div className="flex flex-col mt-4">
                                <span>{subtitle}</span>
                                <span className="font-bold mt-2">{example}</span>
                            </div>

                            <div id="otp" className="flex flex-row justify-center text-center px-2 mt-5">
                                <div className="mx-1 sm:m-2 h-10 w-10 text-center border-b-2 text-md font-medium" >{code[0]}</div>
                                <div className="mx-1 sm:m-2 h-10 w-10 text-center border-b-2 text-md font-medium" >{code[1]}</div>
                                <div className="mx-1 sm:m-2 h-10 w-10 text-center border-b-2 text-md font-medium" >{code[2]}</div>
                                <div className="mx-1 sm:m-2 h-10 w-10 text-center border-b-2 text-md font-medium" >{code[3]}</div>
                                <div className="mx-1 sm:m-2 h-10 w-10 text-center border-b-2 text-md font-medium" >{code[4]}</div>
                                <div className="mx-1 sm:m-2 h-10 w-10 text-center border-b-2 text-md font-medium" >{code[5]}</div>
                            </div>

                            {showResend &&
                                <div className="flex justify-center text-center mt-5">
                                    <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer"><span className="font-bold">Resend OTP</span><i className='bx bx-caret-right ml-1'></i></a>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowCode