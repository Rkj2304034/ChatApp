import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmpassword: "",
    gender: ""
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmpassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await axios.post(`https://chatapp-br7r.onrender.com/api/user/register`, user, {
        headers: {
          "Content-Type": 'application/json'
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setAuthUser(res.data.user));
        navigate("/chat")
      }
    }
    catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.log(error);
    }

    setUser({
      fullname: "",
      username: "",
      password: "",
      confirmpassword: "",
      gender: ""
    })
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-50 relative overflow-hidden font-sans py-10'>
      
      {/* Decorative Background Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-300/30 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px] pointer-events-none"></div>

      <div className='flex flex-col w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50 z-10 mx-4'>

        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 tracking-wide mb-2">
            Create Account
          </div>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-4">

          {/* Fullname Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Fullname
            </label>
            <input
              type="text"
              className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white outline-none transition-all text-slate-700 placeholder-slate-400'
              placeholder='John Doe'
              value={user.fullname}
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
              required
            />
          </div>

          {/* Username Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white outline-none transition-all text-slate-700 placeholder-slate-400'
              placeholder='johndoe123'
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white outline-none transition-all text-slate-700 placeholder-slate-400'
              placeholder='••••••••'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 focus:bg-white outline-none transition-all text-slate-700 placeholder-slate-400'
              placeholder='••••••••'
              value={user.confirmpassword}
              onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
              required
            />
          </div>

          {/* Gender Selection */}
          <div className='pt-1'>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Gender
            </label>
            <div className='flex gap-8'>
              <label className='flex items-center gap-2 cursor-pointer group'>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className='w-4 h-4 text-indigo-600 bg-slate-50 border-slate-300 focus:ring-indigo-500 focus:ring-2 transition-all cursor-pointer'
                  checked={user.gender === "male"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  required
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">Male</span>
              </label>

              <label className='flex items-center gap-2 cursor-pointer group'>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className='w-4 h-4 text-indigo-600 bg-slate-50 border-slate-300 focus:ring-indigo-500 focus:ring-2 transition-all cursor-pointer'
                  checked={user.gender === "female"}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  required
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">Female</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full py-3.5 mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white font-bold rounded-xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200'
          >
            Sign Up
          </button>

          {/* Footer Link */}
          <div className='flex w-full gap-1.5 mt-4 justify-center text-sm font-medium'>
            <span className='text-slate-500'>Already have an account?</span>
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in here
            </Link>
          </div>

        </form>
      </div>
    </div>
  )
}

export default Signup