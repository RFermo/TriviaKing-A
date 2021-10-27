// import Axios from "axios";
import Header from "./MenuComponents/Header";
import { FaArrowDown } from "react-icons/fa";


const Dashboard = () => {

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-700 ">
            <Header />

            <div className="mt-9 w-11/12 mx-auto flex flex-col space-y-7">
                <div>
                    <h1 className="font-inter leading-normal text-2xl text-gray-200 font-bold text-center">Getting started with Trivia King? Click below to familiarize yourself with the game.</h1>
                </div>

                <div className="mx-auto">
                    <FaArrowDown className="text-gray-200 animate-bounce w-8 h-8" />
                </div>

                <button id="slider" className="how-to-play bg-cover focus:outline-none relative h-[200px] rounded-lg w-11/12 mx-auto slide-in">
                    <h2 className="font-inter shadow-xl text-gray-200 bg-gray-800 w-3/5 p-3 rounded-lg text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl uppercase">How to play</h2>
                </button>
            </div>
        </div>
    );
};
 
export default Dashboard;