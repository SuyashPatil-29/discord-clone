import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import db, { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import ServerIcons from './ServerIcons';
import { ChevronDownIcon, CogIcon, MicrophoneIcon, PhoneIcon, PlusIcon } from '@heroicons/react/outline';
import Channel from './Channel';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat';


const Home = () => {
    const [user] = useAuthState(auth)

    const handleAddChannel=()=>{
        const channelName = prompt("Enter a new Channel Name")

        if(channelName){
            db.collection("channels").add({
                channelName: channelName
            })
        }
    }

    
    const [channels]= useCollection(db.collection("channels"))

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
                <div className="bg-[#2f3136] flex flex-col min-w-max">
                    <h2 className="flex text-white font-bold text-sm items-center justify-between border-b border-gray-800 p-4 hover:bg-[#34373c] cursor-pointer">Official Server... <ChevronDownIcon className="h-5 ml-2"/></h2>
                    <div className='text-[#8e9297] flex-grow overflow-y-scroll scrollbar-hidden scrollbar-hide'>
                        <div className='flex items-center p-2 mb-2'>
                        <ChevronDownIcon className="h-3 mr-2"/>
                        <h4 className="font-semibold">Channels</h4>
                        <PlusIcon className="h-6 ml-auto cursor-pointer hover:text-white"  onClick={handleAddChannel}/>
                        </div>
                        <div className='flex flex-col space-y-2 px-2 mb-4'>
                            {channels?.docs.map((doc)=>(
                                <Channel key={doc.id} id={doc.id} name={doc.data().channelName}/>
                            ))}
                        </div>
                    </div>
                    <div className='bg-[#292b2f] p-2 flex justify-between items-center space-x-8'>
                        <div className="flex items-center space-x-1">
                            <img src={user?.photoURL} alt="" className="h-10 rounded-full cursor-pointer" onClick={()=>auth.signOut()}/>
                            <h4 className="text-white text-xs font-medium">
                            {user?.displayName}
                            <span className='text-[#b9bbbe] block'>#{user?.uid.substring(0,4)}</span>
                            </h4>
                        </div>
                        <div className="text-gray-400 flex items-center ml-2">
                            <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                                <MicrophoneIcon className="icon"/>
                            </div>
                            <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                                <PhoneIcon className="icon"/>
                            </div>
                            <div className="hover:bg-[#3a3c43] p-2 rounded-md">
                                <CogIcon className="icon"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='bg-[#36393f] flex-grow'>
                    <Chat />
                </div>
            </div>
        </div>
    );
}

export default Home;

