import { ChevronLeftIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../GlobalContexts/AuthProvider'
import { ReactComponent as Loader } from '../../../assets/spinner.svg'


const Signin = () => {
    const auth = useAuth()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()

        if (email === '' || password === '') {
            console.log(email, password)
            return
        }


        setLoading(true)
        setTimeout(() => {
            auth.signin({ email, password }, () => {
                setLoading(false)
            })
        }, 2000)
    }

    return (
        <div className="body-bg bg-primary-600 md:rounded-lg h-[90%] inset-y-0 pt-5 md:pt-5 pb-6 px-2 md:px-0 relative" >
           {/* { auth.error && <Error title="Login Failed" body={auth.error} action={auth.closeError} />} */}

            <main className="bg-white max-w-lg mx-auto p-8 md:p-6 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 className="font-bold text-2xl">Welcome back to Pickr</h3>
                    <p className="text-gray-600 pt-2">Sign in to your account.</p>
                </section>

                <section className="mt-10">
                    <form className="flex flex-col" method="POST" action="#">
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" >Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="text" id="email" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-600 transition duration-500 px-3 pb-3" />
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" >Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-primary-600 transition duration-500 px-3 pb-3" />
                        </div>
                        <div className="flex justify-end">
                            <a href="#" className="text-sm text-primary-600 hover:text-primary-700 hover:underline mb-6">Forgot your password?</a>
                        </div>
                        <button onClick={signIn} className={` text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 ${loading ? 'bg-gray-300 text-gray-400 cursor-wait' : 'bg-primary-600 hover:bg-primary-700'}`} type="submit">{loading ? <div className='w-full flex items-center space-x-4  justify-center'><Loader className='w-4 h-4 animate-spin' /> <span>please wait...</span></div> : "Sign In"}</button>
                    </form>
                </section>
            </main>

            <div className="max-w-lg flex justify-center mx-auto text-center mt-6 mb-3">
                <Link to="/signup" className="text-white flex ">Don't have an account? <p href="#" className="font-bold hover:underline">Sign up</p>.</Link>
            </div>

            <footer className="max-w-lg mx-auto flex justify-center text-white">
                <a href="#" className="hover:underline">Contact</a>
                <span className="mx-3">•</span>
                <a href="#" className="hover:underline">Privacy</a>
            </footer>
        </div>
    )
}

export default Signin