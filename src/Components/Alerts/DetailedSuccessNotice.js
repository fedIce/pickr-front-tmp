import React from 'react'

const DetailedSuccessNotice = ({ title, body, more = null }) => {
    return (
        <div className="bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700" role="alert">
            <h4 className="text-2xl font-medium leading-tight mb-2">{title}</h4>
            <p className="mb-4">
                {body}
            </p>
            {
                more &&
                <div className='w-full'>
                    <hr className="border-green-600 opacity-30" />
                    <p className="mt-4 mb-0">
                        Whenever you need to, be sure to use margin utilities to keep things nice and tidy.
                    </p>
                </div>
            }
        </div>
    )
}

export default DetailedSuccessNotice