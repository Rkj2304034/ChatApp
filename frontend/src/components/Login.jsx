import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from "react-hot-toast"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import { setAuthUser } from '../redux/userSlice'

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://chatapp-br7r.onrender.com/api/user/login`, user, {
                headers: {
                    "Content-Type": 'application/json'
                },
                withCredentials: true
            })

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/chat")
                dispatch(setAuthUser(res.data.user));
            }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
            console.log(error);
        }

        setUser({
            username: "",
            password: ""
        })
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-slate-50 relative overflow-hidden font-sans'>
            
            {/* Decorative Background Blurs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-300/30 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px] pointer-events-none"></div>

            <div className='flex flex-col w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 z-10 mx-4'>

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 tracking-wide mb-2">
                        Login
                    </div>
                    
                </div>

                <form onSubmit={onSubmitHandler} className="space-y-5">
                    
                    {/* Username Input */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            id='username'
                            className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white outline-none transition-all text-slate-700 placeholder-slate-400'
                            placeholder='Enter your username'
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            id='password'
                            className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white outline-none transition-all text-slate-700 placeholder-slate-400'
                            placeholder='••••••••'
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className='w-full py-3.5 mt-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white font-bold rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200'
                    >
                        Sign In
                    </button>

                    {/* Footer Link */}
                    <div className='flex w-full gap-1.5 mt-4 justify-center text-sm font-medium'>
                        <span className='text-slate-500'>Don't have an account?</span>
                        <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 transition-colors">
                            Sign up here
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login