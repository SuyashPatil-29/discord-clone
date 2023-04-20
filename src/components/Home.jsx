import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import db, { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import ServerIcons from './ServerIcons';
import { PlusIcon } from '@heroicons/react/outline';
import Chat from './Chat';
import ChannelList from './ChannelList';


const Home = () => {
    const [user] = useAuthState(auth)

    

    return (
        <div>
            {!user && <Navigate to={"/"} />}
            <div className="flex h-screen">
                <div className="flex flex-col space-y-3 bg-[#202225] p-3 min-w-max">
                    <div className="server-default hover:bg-discord_purple">
                        <img className="h-5" src='https://rb.gy/kuaslg' />
                    </div>
                    <hr className="border-gray-700 border w-8 mx-auto"/>
                    <ServerIcons image="https://rb.gy/qidcpp" />
                    <ServerIcons image="https://rb.gy/zxo0lz" />
                    <ServerIcons image="https://rb.gy/qidcpp" />
                    <ServerIcons image="https://rb.gy/zxo0lz" />
                
                    <div className="group server-default hover:bg-discord_green">
                        <PlusIcon className=" text-discord_green h-7 group-hover:text-white"/>
                    </div>
                </div>
                <ChannelList />
                <div className='bg-[#36393f] flex-grow'>
                    <Chat />
                </div>
            </div>
        </div>
    );
}

export default Home;

