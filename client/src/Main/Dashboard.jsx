// import Axios from "axios";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaArrowDown } from "react-icons/fa";
import TKlogo from "./TKLogo.png";

const Dashboard = () => {

    const [menuButton, setMenuButton] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 ">
            <button onClick={() => setMenuButton(!menuButton)} className="fixed bottom-5 right-5 w-16 h-16 bg-gray-200 rounded-full focus:outline-none">
                <HiMenu className={`${menuButton ? "hidden" : "block"} absolute w-7 h-7 top-1/2 left-1/2 -mt-3.5 -ml-3.5 text-gray-800`}/>
                <HiX className={`${menuButton ? "block" : "hidden"} absolute w-7 h-7 top-1/2 left-1/2 -mt-3.5 -ml-3.5 text-gray-800`} />
            </button>
            <div className="bg-gray-200 flex items-center justify-around py-3">

                <div>
                    <img className="w-[70px] h-[70px]" src={TKlogo} alt="Trivia King logo" />
                </div>
                <div>
                    <h1 className="text-4xl cursor-default font-georama text-purple-900 font-extrabold tracking-wider">Trivia King</h1>
                </div>

                <div>
                    <img className="w-[70px] h-[70px]" src={TKlogo} alt="Trivia King logo" />
                </div>
            </div>

            <div className="mt-9 w-11/12 mx-auto flex flex-col space-y-7">
                <div>
                    <h1 className="font-inter leading-normal text-2xl text-gray-200 text-center">Getting started with Trivia King? Click below to familiarize yourself with the game.</h1>
                </div>

                <div className="mx-auto">
                    <FaArrowDown className="text-gray-200 animate-bounce w-8 h-8" />
                </div>

                <button id="slider" className="how-to-play focus:outline-none relative h-[200px] rounded-lg w-11/12 mx-auto slide-in">
                    <h2 className="font-inter shadow-xl text-gray-200 bg-gray-800 w-3/5 p-3 rounded-lg text-center absolute top-1/2 left-1/2 text-2xl uppercase">How to play</h2>
                </button>


            </div>


        </div>
    );
};
 
export default Dashboard;