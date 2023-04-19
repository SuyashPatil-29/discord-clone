import { BellIcon, ChatIcon, EmojiHappyIcon, GiftIcon, HashtagIcon, InboxIcon, PlusCircleIcon, QuestionMarkCircleIcon, SearchIcon, UsersIcon } from '@heroicons/react/solid';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChannelId, selectChannelName } from '../features/channel/channelSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import db, { auth } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import Message from './Message';
const Chat = () => {

    const channelId = useSelector(selectChannelId)
    const channelName = useSelector(selectChannelName)
    const [user] = useAuthState(auth)
    const [messages] = useCollection(channelId &&
       db
         .collection("channels")
         .doc(channelId)
         .collection("messages")
         .orderBy("timestamp", "asc")
         )
    const inputRef = useRef("")
    const chatRef = useRef(null)

    const scrollToBottom=()=>{
      chatRef.current.scrollIntoView({
        behaviour: "smooth",
        block: "start"
      });
    }

    const sendMessage = (event)=>{
      event.preventDefault()
      if (inputRef.current.value !== "") {
        db.collection("channels").doc(channelId).collection("messages").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: inputRef.current.value,
          name: user?.displayName,
          photoURL: user?.photoURL,
          email: user?.email,
        });
      }
      inputRef.current.value = "";
      scrollToBottom();
    }


    return (
        <div className='flex flex-col h-screen'>
            <header className="flex items-center justify-between space-x-5 border-b border-gray-800 p-4 -mt-1">
        <div className="flex items-center space-x-1">
          <HashtagIcon className="h-6 text-[#72767d]" />
          <h4 className="text-white font-semibold">{channelName}</h4>
        </div>
        <div className="flex space-x-3">
          <BellIcon className="icon" />
          <ChatIcon className="icon" />
          <UsersIcon className="icon" />
          <div className="flex bg-[#202225] text-xs p-1 rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="bg-[#202225] focus:outline-none text-white pl-1 placeholder-[#72767d]"
            />
            <SearchIcon className="h-4 text-[#72767d] mr-1" />
          </div>
          <InboxIcon className="icon" />
          <QuestionMarkCircleIcon className="icon" />
        </div>
      </header>


      <main className="flex-grow overflow-y-scroll scrollbar-hide">
        {messages?.docs.map((doc) => {
          const { id, message, timestamp, name, photoURL, email } = doc.data();

          return (
            <Message
              key={doc.id}
              id={doc.id}
              message={message}
              timestamp={timestamp}
              name={name}
              email={email}
              photoURL={photoURL}
            />
          );
        })}
        <div ref={chatRef} className="pb-16" />
      </main>
      
      
      <div className="flex items-center p-2.5 bg-[#40444b] mx-5 mb-7 rounded-lg">
        <PlusCircleIcon className="icon mr-4 "/>
        
        <form className='flex-grow '>
        <input type="text" className="bg-transparent focus:outline-none text-[#dcddde] w-full placeholder:text-[#72767d]" disabled={!channelId} placeholder={channelId? `Sending in ${channelName}` : `Select a channel`} ref={inputRef}/>
        <button className='hidden' type='submit' onClick={sendMessage}></button>
        </form>
        
        <GiftIcon className="icon mr-2"/>
        <EmojiHappyIcon className="icon"/>
      </div>
        </div>
    );
}

export default Chat;
