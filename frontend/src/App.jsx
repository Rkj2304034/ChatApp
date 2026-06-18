import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ChatPage from './components/ChatPage';
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Home/>
  },
  {
    path : "/chat",
    element : (
        <ProtectRoute>
          <ChatPage/>
        </ProtectRoute>
    )
  },
  {
    path : "/signup",
    element : <Signup/>
  },
  {
    path : "/login",
    element : <Login/>
  },
])

import './App.css'
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { setSocket } from './redux/socketSlice';
import {setOnlineUsers} from './redux/userSlice'
import { setAuthUser } from './redux/userSlice';
import ProtectRoute from './components/ProtectRoute';
import axios from 'axios';
import { setLoading } from './redux/userSlice';

function App() {

  const {authUser} = useSelector(state => state.user);
  const{socket} = useSelector(state => state.socket) 
  const dispatch = useDispatch();

  // call 
  useEffect(() => {
     async function fetchData(){
      
       dispatch(setLoading(true));
        try{
          const res = await axios.get('http://localhost:8000/api/user/me',{
            withCredentials : true
          })
          console.log(res);

          if(res.status == 200){
              dispatch(setAuthUser(res.data.user))
          }
        }
        catch(err){
          console.log(err);
        }

        dispatch(setLoading(false));

     }


     fetchData();
  },[])

 useEffect(() => {
    if (authUser) {
      const socketInstance = io('http://localhost:8000', {
        withCredentials: true,
        query: {
          userId: authUser._id,
        },
      });

      dispatch(setSocket(socketInstance));

      socketInstance.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socketInstance.disconnect();
    } else {
      if (socket) {
        socket.disconnect();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);



  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
