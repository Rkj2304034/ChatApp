import React from 'react'
import '../index.css'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';
import OtherUser from './OtherUser';
import'./OtherUser.css'

const OtherUsers = () => {

  useGetOtherUsers();

  const {tempUsers} = useSelector(state => state.user);

  if(!tempUsers){
    return;
  }

  return (
    <div className="flex flex-col gap-1  custom-scroll text-black font-bold  ">

     { tempUsers?.map((user) =>  {
          return(
            <OtherUser key={user._id} user={user} />
          )
      })}

    </div>
  )
}

export default OtherUsers
