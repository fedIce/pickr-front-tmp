import React from 'react'

const WarningAccentBorder = ({title, body }) => {
    return (
        <div className='text-sm md:text-md '>
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">{title}</p>
                <p>{body}</p>
            </div>
        </div>
    )
}

export default WarningAccentBorder