import { HashtagIcon } from '@heroicons/react/outline';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setChannelInfo } from '../features/channel/channelSlice';

const Channel = ({id,name}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const setChannel = ()=>{
        dispatch(setChannelInfo({
            channelId: id,
            channelName: name,
        }))
        navigate(`/channels/${id}`)
    };

    return (
        <div className="font-medium flex items-center cursor-pointer hover:bg-[#383c43] p-1 rounded-md hover:text-white"
        onClick={setChannel}>
            <HashtagIcon className='h-5 mr-2'/> {name}
        </div>
    );
}

export default Channel;
