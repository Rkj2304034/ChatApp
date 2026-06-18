import React from 'react';
import OtherUsers from './OtherUsers';
import { ImSearch } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser, setOtherUsers, setTempUsers } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { otherUsers } = useSelector(state => state.user); 

  const handleChange = (e) => {
    e.preventDefault();
    try {
      const reqUsers = otherUsers.filter(user => 
        user.fullname.toLowerCase().trim().startsWith(e.target.value.toLowerCase().trim())
      );
      dispatch(setTempUsers(reqUsers));
    } catch (error) {
      console.log(error);
    }
  }

  const logOutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/user/logout');
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setOtherUsers(null));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col h-full w-[26%] max-w-[400px] bg-white border-r border-slate-200 shadow-sm z-10">
      
      {/* HEADER */}
      <div className="px-5 py-4 h-[75px] border-b border-indigo-700 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm">
        <h1 className="text-2xl font-bold tracking-wide">ChatApp</h1>
      </div>

      {/* SEARCH */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center bg-white border border-slate-200 rounded-full px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-indigo-400 transition-all">
          <ImSearch className="text-slate-400 mr-3 text-lg" />
          <input
            className="bg-transparent w-full outline-none text-sm text-slate-700 placeholder-slate-400"
            onChange={handleChange}
            type="text"
            placeholder="Search users..."
          />
        </div>
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5 custom-scroll bg-slate-50/30">
        <OtherUsers />
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-200 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        <button
          onClick={logOutHandler}
          className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold border border-rose-100
                     hover:bg-rose-500 hover:text-white hover:border-rose-500 active:scale-[0.98] transition-all duration-200"
        >
          Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;