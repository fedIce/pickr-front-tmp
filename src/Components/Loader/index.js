import React from 'react'

const Loader = () => {
    return (
        <div className='fixed z-30 bg-primary-900/75 flex justify-center items-center inset-0'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>

    )
}

export const ContainedLoader = () => {
    return (
        <div className='w-full h-full bg-primary-900/75 flex justify-center items-center'>
            <div className="lds-ripple"><div></div><div></div></div>
        </div>
    )
}

export default Loader