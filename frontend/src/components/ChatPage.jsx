import React, { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import MessageContainer from './MessageContainer.jsx'


const ChatPage = () => {
  const [selectedFile,setSelectedFile] = useState(null);
  return (
    <div className='flex h-screen overflow-hidden w-full bg-purple-50'>

      <Sidebar />

      <div className='w-0.5 bg-purple-200' />

      <MessageContainer file={selectedFile} setFile={setSelectedFile} />

    </div>
  )
}

export default ChatPage
