import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import db, { auth } from '../firebase';
import { PlusIcon } from '@heroicons/react/outline';
import Server from './Server';


const Servers = () => {
    
    const [server]= useCollection(db.collection("server"))

    const handleAddServer=()=>{
        const serverName = prompt("Enter a new Server Name")

        if(serverName){
            db.collection("server").add({
                serverName: serverName
            })
        }

    }


    return (
        <div className="flex flex-col space-y-3 bg-[#202225] p-3 min-w-max">
        <div className="server-default hover:bg-discord_purple">
            <img className="h-5" src='https://rb.gy/kuaslg' />
        </div>
        <hr className="border-gray-700 border w-8 mx-auto"/>

        {server?.docs.map((doc)=>(
            <Server key={doc.id} id={doc.id} name={doc.data().serverName}>
                <p className='h-12 cursor-pointer rounded-full transition-all duration-100 ease-out hover:rounded-2xl bg-white flex items-center justify-center'>{doc.data().serverName}</p>
            </Server>
        ))}

    
        <div className="group server-default hover:bg-discord_green">
            <PlusIcon className=" text-discord_green h-7 group-hover:text-white" onClick={handleAddServer}/>
        </div>
    </div>
    );
}

export default Servers;
