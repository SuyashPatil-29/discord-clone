import { TrashIcon } from '@heroicons/react/solid';
import moment from 'moment/moment';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import db, { auth } from '../firebase';
import { useSelector } from 'react-redux';
import { selectChannelId } from '../features/channel/channelSlice';


const Message = ({id, message, timestamp, name, photoURL, email }) => {

    const [user] = useAuthState(auth)
    const channelId = useSelector(selectChannelId)

    return (
        <div className='flex items-center pl-5 my-5 p-1 mr-2 hover:bg-[#32353b] group'>
            <img src={photoURL} className="rounded-full h-10 cursor-pointer mr-3 hover:shadow-2xl"/>
            <div className="flex flex-col">
                <h4 className="flex items-center space-x-2 font-medium">
                    <span className="hover:underline text-white text-sm cursor-pointer">{name}</span>
                    <span className="text-[#72767d] text-xs">
                      {moment(timestamp?.toDate().getTime()).format("lll")}
                    </span>
                </h4>
                <p className="text-sm text-[#dcddde]">{message}</p>
            </div>
            {user?.email === email && (
                 <div className=" hover:bg-[#ed4245] p-1 ml-auto rounded-sm text-[#ed4245] hover:text-white cursor-pointer" onClick={()=>{
                    db
                    .collection("channels")
                    .doc(channelId)
                    .collection("messages")
                    .doc(id)
                    .delete()
                 }
                 
                 }>
                 <TrashIcon className="h-5 hidden group-hover:inline" />
                </div>
            )}
        </div>
    );
}

export default Message;
