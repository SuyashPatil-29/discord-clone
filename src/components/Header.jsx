import React from 'react';
import {DownloadIcon, MenuIcon} from "@heroicons/react/outline"
import { auth, provider } from "../firebase.js";
import {useAuthState} from "react-firebase-hooks/auth"
import { Navigate, useNavigate } from "react-router-dom";


const Header = () => {
    
    const navigate = useNavigate()

    const [user]= useAuthState(auth)

    const signIn = (e)=>{
         e.preventDefault();

         auth.signInWithPopup(provider)
         .then(()=> useNavigate("/channels"))
         .catch((error)=>alert(error.message))
    }

    const navigateTo = ()=>{
        navigate("/channels")
    }

    return (
        <div>
        <header className="flex items-center justify-between py-4 px-6 bg-discord_blue">
            <a href="#">
                <img className="h-12 w-16 object-contain" src="/src/assets/svg/discord-svgrepo-com (3).svg"/>
            </a>
            <div className="hidden lg:flex space-x-6">
                <a className="link">Download</a>
                <a className="link">Why Discord?</a>
                <a className="link">Nitro</a>
                <a className="link">Safety</a>
                <a className="link">Support</a>
                
            </div>
            <div className='flex space-x-4 '>
                <button className="bg-white p-2 rounded-full text-xs md:text-sm px-4 focus:outline-none hover:shadow-2xl hover:text-discord_blurple transition duration-200 ease-in-out whitespace-nowrap font-medium"
                onClick={!user ? signIn : navigateTo }>
                {!user ? "Login" : "Open Discord"}
                </button>
                <MenuIcon className='h-9 text-white cursor-pointer lg:hidden'/>
            </div>
        </header>
        <div className="bg-discord_blue pb-8 md:pb-0">
            <div className="p-7 py-9 h-screen md:h-[83vh] md:flex relative ">
                <div className="flex flex-col gap-7 md:max-w-md lg:max-w-none justify-center">
                    <h1 className="text-5xl text-white font-bold">Your place to talk</h1>
                    <h2 className="text-white text-lg font-light tracking-wide lg:max-w-3xl w-full">
                    Whether you’re part of a school club, gaming group, worldwide art
                    community, or just a handful of friends that want to spend time
                    together, Discord makes it easy to talk every day and hang out more
                    often.
                    </h2>
                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row md:items-start sm:items-center gap-6">
                       <button className="bg-white w-60 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:text-discord_blurple focus:outline-none transition duration-200 ease-in-out">
                       <DownloadIcon className="w-6 mr-2" />
                       Download for Mac
                       </button>
                       <button className="bg-gray-900 text-white w-72 font-medium flex items-center justify-center rounded-full p-4 text-lg hover:shadow-2xl hover:bg-gray-800 focus:outline-none transition duration-200 ease-in-out">
                       Open Discord in your browser
                       </button>
                    </div>
                </div>
                <div className="flex-grow">
                    <img className="absolute -left-36 sm:-left-44 md:hidden" src="/src/assets/e92fcc9ab6e63c1a17e954af347a1f1d.svg"/>
                    <img className="hidden md:inline absolute" src='/src/assets/7b01f72a2054561145b6dd04add417c0.svg' />
                </div>
            </div>
        </div>
        </div>
    );
}

export default Header;
