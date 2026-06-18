import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice';
import axios from "axios";

const useGetMessages = () => {

    const {selectedUser} = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {

        const fetchMessages = async() => {

            try{
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8000/api/message/receive/${selectedUser?._id}`)
                console.log(res.data);

                //put the messages obtained into store(react-redux)
                dispatch(setMessages(res.data.messages));
            }
            catch (error) {
                console.log(error);
            }

        }
        fetchMessages();
        },[selectedUser,])
}

export default useGetMessages
