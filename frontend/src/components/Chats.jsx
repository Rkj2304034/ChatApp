import React from 'react'
import { useSelector } from 'react-redux'
import useGetMessages from '../hooks/useGetMessages';
import Chat from './Chat'
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Chats = () => {

  useGetMessages();
  useGetRealTimeMessage();

  const {messages} = useSelector(state => state.message);
  if(!messages){
    return;
  }
  else{
    console.log("i got your message");
  }

  return (

        <div>
          { 
          
            messages?.map((message) => {
              return(
                <Chat key={message._id} message={message} />
              )
            })

        }
        </div>
      

  )
}

export default Chats;
