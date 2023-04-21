import React from 'react';
import { useDispatch } from 'react-redux';
import { setServerInfo } from '../features/Servers/serverSlice';

const Server = ({id,name}) => {
    const dispatch = useDispatch();
    const setServer = ()=>{
        dispatch(setServerInfo({
            serverId: id,
            serverName: name,
        }))
    };

    return (
        <div className='h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl bg-white'
        onClick={setServer}>
           {name}
        </div>
    );
}

export default Server;