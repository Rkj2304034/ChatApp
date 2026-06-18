import axios from 'axios'
import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOtherUsers } from '../redux/userSlice';

// custom hook creation for getting other users

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    const onlineUsers= useSelector(state => state.user)
  useEffect(()=>{

    const fetchOtherUsers = async() => {
        try{
            axios.defaults.withCredentials = true;
            const res = await axios.get('http://localhost:8000/api/user/');
            // now we have to send otherUsers to store
            dispatch(setOtherUsers(res.data));

        }
        catch (error){
            console.log(error);
        }
    }

    fetchOtherUsers();

  },[])
  
}

export default useGetOtherUsers
