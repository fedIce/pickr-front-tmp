import React from 'react'

const PointProgressBar = ({ status, count = 4, progress = 33 }) => {
    const activeDot = 100 / (count - 1)
    const floored_activeDot = Math.floor(activeDot)
    const v = [0, 33, 66, 100].indexOf(progress)
    return (
        <div className='w-full flex flex-col my-6 space-y-4'>
            <div className='h-1 w-full bg-gray-200 flex justify-start relative rounded-full'>
                <div style={{ width: `${progress}%` }} className={`ease_transition rounded-full h-full bg-green-600`}>

                </div>
                <div className='w-full h-full flex justify-between place-items-center absolute'>
                    {
                        [...(new Array(count))].map((_, indx) => <div key={indx} className={` ease_transition w-3 h-3 ${((progress >= Math.floor(activeDot * indx))) && 'bg-green-600'} ${((progress === Math.floor(activeDot * indx))) && 'scale-150 ring-1 ring-white'}  rounded-full bg-gray-200`}></div>)
                    }
                </div>
            </div>
            <div className='hidden md:flex w-full h-full justify-between place-items-center'>
                {
                    [...(new Array(count))].map((_, indx) => {
                        return (
                            <div key={indx} className={` ease_transition flex flex-col items-center text-sm text-gray-300  ${((progress >= Math.floor(activeDot * indx))) && 'font-bold text-green-500'}`}>
                                <span>{status[indx].text}</span>
                                {/* <span>11:23 PM</span> */}
                            </div>
                        )
                    })
                }
            </div>
            <div className={`py-2 flex justify-center w-full md:hidden font-bold ${status[v].color}`}>{status[v].message}</div>
        </div>
    )
}

export default PointProgressBar