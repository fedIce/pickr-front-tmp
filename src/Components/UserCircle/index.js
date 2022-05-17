import { BellIcon, LoginIcon, LogoutIcon, TemplateIcon, UserIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../GlobalContexts/AuthProvider'

const placeholderImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"


const UserCircle = () => {
    const auth = useAuth()
    const [open, setOpen] = useState(false)
    return (
        <div className='dropdown relative'>
            <div onClick={() => setOpen(!open)} className='w-12 h-12 ring-2 ring-black/10 rounded-full overflow-hidden dropdown-toggle relative cursor-pointer'>
                <img src={auth.user ? auth.user.photoURL : placeholderImage} className='w-full h-full rounded-full aspect-square' />
            </div>
            {
                auth.user ?
                    <ul className={`dropdown-menu ${open ? 'block' : 'hidden'} min-w-max w-36 absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none -translate-x-24`}
                        aria-labelledby="dropdownMenuButton2" >
                        <li onClick={() => setOpen(false)}>
                            <Link to="/dashboard" className=" rounded-t-lg dropdown-item text-sm py-2 px-4 flex  font-normal space-x-4 w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                                <span><TemplateIcon className='w-5 h-5' /></span>
                                <span>Dashboard</span>
                            </Link>
                        </li>

                        <li onClick={() => setOpen(false)}>
                            <div onClick={() => null} className=" dropdown-item cursor-pointer text-sm border-t-2 flex space-x-4 py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                                <span><BellIcon className='w-5 h-5' /></span>
                                <span>Notifications</span>
                            </div>
                        </li>

                        <li onClick={() => setOpen(false)}>
                            <div onClick={() => auth.signout()} className=" dropdown-item cursor-pointer text-sm border-t-2 flex space-x-4 py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                                <span><LogoutIcon className='w-5 h-5' /></span>
                                <span>Sign Out</span>
                            </div>
                        </li>
                    </ul>
                    :
                    <ul className={`dropdown-menu ${open ? 'block' : 'hidden'} min-w-fit w-36 absolute bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none -translate-x-24`}
                        aria-labelledby="dropdownMenuButton2" >
                        <li onClick={() => setOpen(false)}>
                            <Link to="/signup" className=" rounded-t-lg dropdown-item text-sm py-2 px-4 flex  font-normal space-x-4 w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                                <span><UserIcon className='w-5 h-5' /></span>
                                <span>Sign Up</span>
                            </Link>
                        </li>
                        <li onClick={() => setOpen(false)}>
                            <Link to='/signin' className=" dropdown-item cursor-pointer text-sm border-t-2 flex space-x-4 py-2 px-4 font-normal w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100">
                                <span><LoginIcon className='w-5 h-5' /></span>
                                <span>Sign In</span>
                            </Link>
                        </li>
                    </ul>

            }
        </div>
    )
}

export default UserCircle