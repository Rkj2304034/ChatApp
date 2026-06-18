import React, { useEffect } from 'react';
import Chats from './Chats';
import SendMessage from './SendMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import FilePreview from './FilePreview';

const MessageContainer = (props) => {
  const dispatch = useDispatch();
  const { authUser, selectedUser, onlineUsers } = useSelector(state => state.user);

  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, [dispatch]);

  // --- IMPROVED EMPTY STATE ---
  if (!selectedUser) {
    return (
      <div className='grow flex h-full justify-center items-center flex-col bg-slate-50'>
        <div className='flex flex-col items-center justify-center text-center space-y-6 p-8'>
          
          {/* Tilted Rounded Square Icon */}
          <div className='w-28 h-28 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-100 rotate-3'>
            <div className='-rotate-3'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
            </div>
          </div>
          
          {/* Welcome Text */}
          <div className='space-y-3'>
            <h1 className='text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight'>
              Welcome, <span className='text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600'>{authUser?.fullname}</span>
            </h1>
            <p className='text-lg text-slate-500 font-medium max-w-sm mx-auto'>
              Select a conversation from the sidebar to continue chatting.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col grow relative bg-white'>
      
      {/* Header */}
      <div className='flex gap-4 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 h-[75px] items-center shadow-md z-10'>
        <div className={`avatar ${onlineUsers?.includes(selectedUser._id) ? "online" : ""} ring-2 ring-indigo-300 ring-offset-2 ring-offset-indigo-600 rounded-full`}>
          <div className='rounded-full w-11 h-11 bg-white'>
            <img src={selectedUser?.profilePhoto} alt="user avatar" className="object-cover rounded-full" />
          </div>
        </div>
        <div className='flex flex-col'>
          <p className='font-semibold text-lg text-white leading-tight'>{selectedUser?.fullname}</p>
          <p className='text-xs text-indigo-100 font-medium tracking-wide'>
            {onlineUsers?.includes(selectedUser._id) ? "Online now" : "Offline"}
          </p>
        </div>
      </div>

      {/* Chat Area - Removed slate background and blend mode to restore your image */}
      <div className="grow overflow-y-auto custom-scroll bg-[url('/bg.png')] bg-repeat bg-[size:800px] relative">
        <Chats />
      </div>

      {/* File Preview */}
      {props.file && (
        <div className="border-t border-slate-200 bg-slate-50">
          <FilePreview file={props.file} setFile={props.setFile} />
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-slate-200 bg-white">
        <SendMessage file={props.file} setFile={props.setFile} />
      </div>
      
    </div>
  );
}

export default MessageContainer;