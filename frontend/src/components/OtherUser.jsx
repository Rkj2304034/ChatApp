import React from 'react'
// import { User } from '../../../backend/models/user'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';


const OtherUser = (props) => {
    const user = props.user;
    const dispatch = useDispatch();
    const {selectedUser,onlineUsers} = useSelector(store => store.user);


    const selectedUserHandler = async() => {
        dispatch(setSelectedUser(user));
    }

    return (
      

            <div  onClick={selectedUserHandler} className={` ${user?._id === selectedUser?._id ? "bg-[#9d96ff80]" : ''}  w-full   flex gap-3 border-b-neutral-800 hover:[background-color:#9d96ff80] p-3   ` } >
                <div className={`${onlineUsers?.includes(user._id)? "online" : ''}  avatar ` }  >
                    <div className='rounded-full w-12' >
                        <img src={user?.profilePhoto} alt="img" />
                    </div>

                </div>
                <div className='flex items-center' >
                    < p className='font-medium text-lg ' >{user?.fullname}</p>
                </div  >
            </div>

        
    )
}

export default OtherUser
