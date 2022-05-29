import React from 'react'

const VerticalProgressBar = ({ status, count = 4, progress = 33, courier }) => {
    const activeDot = 100 / (count - 1)
    const floored_activeDot = Math.floor(activeDot)
    const v = [0, 33, 66, 100].indexOf(progress)
    return (
        <div className='w-full h-full flex my-6 items-center space-x-4'>
            <div className='h-full w-1 bg-gray-200 flex justify-start relative rounded-full'>
                <div style={{ height: `${progress}%` }} className={`ease_transition rounded-full w-full bg-green-600`}>

                </div>
                <div className='w-full h-full flex flex-col justify-between place-items-center absolute'>
                    {
                        [...(new Array(count))].map((_, indx) => <div key={indx} className={`relative ease_transition w-3 h-3 ${((progress >= Math.floor(activeDot * indx))) && 'bg-green-600'} ${((progress === Math.floor(activeDot * indx))) && 'scale-150 ring-1 ring-white'}  rounded-full bg-gray-200`}>
                            {
                                ((progress === Math.floor(activeDot * indx))) &&
                                <div className='w-auto absolute left-5 h-full flex items-center'>
                                    <div style={{ width: 0, height: 0, borderTop: '.5rem solid transparent', borderBottom: '.5rem solid transparent', borderRight: '1rem solid #fff' }}></div>
                                    <div className='w-[180px] h-auto flex items-center space-x-2 p-2 rounded-lg bg-white  text-sm font-sans '>
                                        {
                                            courier &&
                                            <div className='w-auto p-2 items-center rounded-md flex'>
                                                <div className='w-[20px] h-[20px] rounded-full ring-2 ring-green-600 bg-white overflow-hidden'>
                                                    <img src={courier.avatar} className='w-full h-full object-cover' />
                                                </div>
                                            </div>
                                        }
                                        {
                                            courier &&
                                            <div className='flex flex-col -space-y-2'>
                                                <span className='text-[10px] font-bold text-gray-700'>{courier.name}</span>
                                                <span className='font-light text-[8px] text-gray-400'>{status[v].message}</span>
                                            </div>
                                        }
                                        {
                                            (!courier && v < 1) &&
                                            <div className='flex flex-col -space-y-2'>
                                                <span className={`text-[10px] font-bold ${status[v].color}`}>Pending</span>
                                                <span className='font-light text-[8px] text-gray-400'>waiting for an available Pickr...</span>
                                            </div>
                                        }
                                    </div>
                                </div>
                            }
                        </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default VerticalProgressBar