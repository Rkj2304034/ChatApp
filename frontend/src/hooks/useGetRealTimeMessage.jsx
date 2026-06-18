import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'
const useGetRealTimeMessage = () => {
    const dispatch = useDispatch();
    const {messages} = useSelector(state => state.message);
    const {socket} = useSelector(state => state.socket);

  useEffect(() => {
  const handleNewMessage = (newMessage) => {
    dispatch(setMessages([...messages,newMessage]));
  };

  socket?.on("newMessage", handleNewMessage);

  return () => {
    socket?.off("newMessage", handleNewMessage); // cleanup
  };
}, [socket,messages,setMessages]);


}

export default useGetRealTimeMessage;
