import Header from "../MenuComponents/Navigation/Header";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import Testimonial from "./Testimonial/Testimonial";
import HowToPlay from "../images/HowToPlay.png";
import { HiX } from "react-icons/hi";
import { useState } from "react";

const Dashboard = () => {

    const [howToPlay, setHowToPlay] = useState(false);

    return (
        <div>
            <div>

                <Header />

                <div className="bg-purple-900 py-16 xl:py-24">

                    <div className="flex flex-col xl:flex-row xl:items-center space-y-7 xl:space-y-0 xl:space-x-14 xl:w-5/6 xl:mx-auto">
                        <div className="w-11/12 mx-auto">
                            <h1 className="font-inter !leading-normal text-2xl md:text-3xl 2xl:text-4xl text-gray-200 font-bold text-center">Getting started with Trivia King? Click on the "How to play" button to familiarize yourself with the game.</h1>
                        </div>

                        <div className="mx-auto">
                            <FaArrowDown className="text-gray-200 xl:hidden animate-bounce w-8 h-8" />
                            <FaArrowRight className="text-gray-200 hidden xl:block right-bounce w-10 h-10" />
                        </div>

                        <button onClick={() => setHowToPlay(!howToPlay)} id="slider" className="how-to-play bg-cover focus:outline-none relative h-[200px] md:h-[230px] xl:h-[300px] rounded-lg w-11/12 md:w-4/5 xl:w-3/4 mx-auto slide-in">
                            <h2 className="font-inter shadow-xl text-gray-200 bg-gray-800 w-3/5 p-3 rounded-lg text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl uppercase">How to play</h2>
                        </button>
                    </div>
                </div>

                <div className={`${howToPlay ? `block` : `hidden`}`}>
                    <div id="slider" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none slide-in">
                        <div className="relative my-6 w-11/12 md:w-3/4 xl:w-3/5 2xl:w-1/2 mx-auto">
                            <div className="border-0 rounded-lg relative flex flex-col space-y-7 w-full bg-gray-200 px-6 py-10 outline-none focus:outline-none">
                                <button onClick={() => setHowToPlay(!howToPlay)}>
                                    <HiX className="w-8 h-8 ml-auto" />
                                </button>
                                
                                <img className="h-[250px] md:h-[400px] xl:h-[500px]" src={HowToPlay} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
                </div>

                <div className="my-16">
                    <div className="pb-14">
                        <div className="flex flex-col space-y-6 xl:space-y-10">
                            <div className="bg-gray-800 w-max px-4 py-3 2xl:px-6 2xl:py-5 mx-auto rounded-lg">
                                <h1 className="font-georama font-semibold text-4xl xl:text-5xl text-gray-200 shadow-xl">Testimonials</h1>
                            </div>
                            
                            <div className="w-85 mx-auto">
                                <h1 className="font-inter font-semibold text-center text-lg md:text-2xl xl:text-3xl">User feedback is critical for our app to be successful. Check out what people are saying about us!</h1>
                            </div>
                        </div>
                    </div>
                    
                    <Testimonial />
                </div>
            </div>
        </div>
    );
};
 
export default Dashboard;