import React, { useState, useEffect } from 'react';
import { FaSadTear, FaGrinStars, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Gameover = (props) => {

    const [showModal, setShowModal] = useState(false);

    /*
        We need to fetch the username and the highest score from the database and we also need to update
        the highest score in case the score that the user got (props.score) is bigger than his previous
        highest score so we would need some sort of update request to the database. Also, if the amount
        of lifelines used (props.amount50, props.amountChange) is bigger than 0 we need to update their current lifelines
        in the database so that also needs an update request.
    */

    useEffect(() => {
        const interval = setInterval(() => {
            setShowModal(true);
        }, 1500);

        return () => clearInterval(interval)
    }, []);

    const handleClick = () => {
        window.location.reload();
    };

    return (
        <div>
            {showModal &&
                <div>
                    <div id="slider" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none slide-in">
                        <div className="relative my-6 mx-auto w-5/6 lg:w-3/4 xl:w-[700px]">
                            <div className="border-0 rounded-lg relative flex flex-col space-y-7 w-full bg-gray-200 px-6 py-10 outline-none focus:outline-none">
                                <div className="flex items-center space-x-4 bg-red-700 w-max mx-auto px-3 py-2 rounded-lg text-center">
                                    <div>
                                        <FaSadTear className="text-gray-200 w-8 h-8" />
                                    </div>
                                    <p className="text-gray-200 font-inter font-semibold text-3xl xl:text-4xl">Game over!</p>
                                </div>

                                <ul className="flex flex-col list-disc list-inside space-y-3">
                                    <li className="text-xl xl:text-2xl font-inter">
                                        User: <span className="font-semibold">RFermo98</span>
                                    </li>
                                    <li className="text-xl xl:text-2xl font-inter">
                                        Score: <span className="font-semibold">{props.score}</span>
                                    </li>
                                    <li className="text-xl xl:text-2xl font-inter">
                                        Highest score: <span className="font-semibold">10</span>
                                    </li>
                                    <li className="text-xl xl:text-2xl font-inter">
                                        Lifelines used: <span className="font-semibold">{props.amount50Used + props.amountChangeUsed}</span>
                                    </li>
                                </ul>

                                <div className="flex flex-col space-y-7 xl:flex-row xl:space-y-0 xl:space-x-10 mx-auto">
                                    <button onClick={handleClick} className="bg-gray-800 flex items-center justify-center xl:justify-start space-x-4 rounded-xl px-4 py-2">
                                        <FaGrinStars className="w-6 h-6 text-gray-200" />
                                        <p className="text-2xl font-inter text-gray-200">Play again!</p>
                                    </button>
                                    <Link to="/dashboard" className="bg-gray-800 flex items-center justify-center xl:justify-start space-x-4 rounded-xl px-4 py-2">
                                        <FaHome className="w-6 h-6 text-gray-200" />
                                        <p className="text-2xl font-inter text-gray-200">Home</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="opacity-90 fixed inset-0 z-40 bg-black"></div>
                </div>
            }
        </div>
    );
};

export default Gameover;
