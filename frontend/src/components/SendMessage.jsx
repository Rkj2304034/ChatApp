import axios from 'axios';
import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { IoAddSharp } from "react-icons/io5";
import { useRef } from 'react';


const SendMessage = (props) => {
  const [message,setMessage] = useState("");
  const fileRef = useRef(null);

  const messageHandler = (e) => {
      setMessage(e.target.value);
  }

  const {selectedUser} = useSelector(state => state.user);
  const {messages} = useSelector(state => state.message);
  const dispatch = useDispatch();
  
  const sendBtnHandler = async() => {
    const formData = new FormData();
    formData.append("message",message);
   if(props.file) formData.append("file",props.file);

      try{
        const res = await axios.post(`https://chatapp-br7r.onrender.com/api/message/send/${selectedUser._id}`,formData);

      console.log(res);
      
      if(res.status == 201){
        setMessage("");
      props.setFile(null);
       dispatch(setMessages([...messages, res.data.message]));
      }
      }
      catch(err){
        console.log(err);
      }
  }

  const handleFilePicker = async() => {
    fileRef.current.click();
  }

  const handleFileSelection = (e) => {
    props.setFile(e.target.files[0])
    console.log(props.file)
  }

  return (
    <div className='h-20 items-center flex gap-2 p-2 justify-evenly rounded-md w-full relative text-black ' >
      <button
  onClick={handleFilePicker}
  className="text-gray-500 hover:text-indigo-600"
>
  <IoAddSharp size={42} />
</button>
      <input ref={fileRef} onChange={handleFileSelection}  className='hidden' type="file" />
      <input   value={message} onChange={messageHandler} type="text" placeholder="Type a message..."
        className="
          flex-1
          bg-gray-200
          text-gray-800
          px-4
          py-2
          rounded-full
          outline-none
          focus:bg-white
          focus:ring-2
          focus:ring-indigo-300
          transition
        "
/>
      <button  onClick={sendBtnHandler} className=' text-white hover:bg-zinc-300 p-3 rounded-full bg-purple-600 ' >
        <IoSend size={18} />
      </button>
    </div>
  )
}

export default SendMessage
