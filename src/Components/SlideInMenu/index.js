import { Dialog, Transition } from '@headlessui/react'
import { BellIcon, ClipboardIcon, HomeIcon, LogoutIcon } from '@heroicons/react/outline'
import { LoginIcon } from '@heroicons/react/solid'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../GlobalContexts/AuthProvider'

const SlideInMenu = (props) => {

    const placeholderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
    const { open, setOpen } = props

    const user = useAuth()

    const signOut = async () => {
        user.signout()
        setOpen(!open)
    }

    return (
        <Dialog open={open} onClose={setOpen} className="fixed inset-0 overflow-y-auto" >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500/75" />
            <div className='w-[70%] sm:w-[60%] flex flex-col md:w-[30%] lg:w-[20%] bg-white h-full shadow-lg relative'>
                {
                    user.user &&
                    <div className='flex w-full space-x-4 items-center py-6 px-4'>
                        <img src={user.user ? user.user.photoURL : placeholderImage} className='w-12 h-12 ring-2 ring-black/10 rounded-full object-cover' />
                        <div className='flex flex-col'>
                            <span className='text-lg font-bold'>{user.user.displayName}</span>
                            <span className='text-sm text-gray-400'>Credits</span>
                        </div>
                    </div>
                }
                <Link to='/' onClick={() => setOpen(!open)} className='px-4 cursor-pointer flex items-center space-x-2 py-2 m-2 rounded hover:bg-primary-500 hover:text-white text-gray-700'><HomeIcon className='base-icon' /> <span>Home</span></Link>
                <Link to='/dashboard' onClick={() => setOpen(!open)} className='px-4 cursor-pointer flex items-center space-x-2 py-2 m-2 rounded hover:bg-primary-500 hover:text-white text-gray-700'><ClipboardIcon className='base-icon' /> <span>Dashboard</span></Link>
                <div onClick={() => setOpen(!open)} className='px-4 cursor-pointer flex items-center space-x-2 py-2 m-2 rounded hover:bg-primary-500 hover:text-white text-gray-700'><BellIcon className='base-icon' /> <span>Notification</span></div>
                {user.user && <div onClick={() => signOut()} className='px-4 cursor-pointer flex items-center space-x-2 py-2 m-2 rounded hover:bg-primary-500 hover:text-white text-gray-700'><LogoutIcon className='base-icon' /> <span>Logout</span></div>}
                {!user.user && <Link to='/signin' onClick={() => setOpen(!open)} className='px-4 cursor-pointer flex items-center space-x-2 py-2 m-2 rounded hover:bg-primary-500 hover:text-white text-gray-700'><LoginIcon className='base-icon' /> <span>Login</span></Link>}
            </div>
        </Dialog>
    )
}

export default SlideInMenu