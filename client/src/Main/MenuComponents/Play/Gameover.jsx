import React, { useState, useEffect } from 'react';
import { FaSadTear, FaGrinStars, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// I still need to work on styling some buttons in the modal.

const Gameover = (props) => {

    const [showModal, setShowModal] = useState(false);

    // We need to fetch the username and their highest score from the database.

    useEffect(() => {
        const interval = setInterval(() => {
            setShowModal(true);
        }, 2000);

        return () => clearInterval(interval)
    }, []);

    return (
        <div>
            {showModal &&
                <div>
                    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative my-6 mx-auto w-[700px]">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col space-y-7 w-full bg-gray-200 px-6 py-10 outline-none focus:outline-none">
                                <div className="flex items-center space-x-4 bg-red-700 w-max mx-auto px-3 py-2 rounded-lg text-center">
                                    <div>
                                        <FaSadTear className="text-gray-200 w-8 h-8" />
                                    </div>
                                    <p className="text-gray-200 font-inter font-semibold text-4xl">Game over!</p>
                                </div>

                                <ul className="flex flex-col space-y-3">
                                    <li className="text-2xl font-inter">
                                        User: <span className="font-semibold">RFermo98</span>
                                    </li>
                                    <li className="text-2xl font-inter">
                                        Score: <span className="font-semibold">{props.score}</span>
                                    </li>
                                    <li className="text-2xl font-inter">
                                        Highest score: <span className="font-semibold">10</span>
                                    </li>
                                    <li className="text-2xl font-inter">
                                        Lifelines used: <span className="font-semibold">1</span>
                                    </li>
                                </ul>

                                <div className="flex space-x-10 mx-auto">
                                    <Link to="/play" className="bg-gray-800 flex items-center space-x-4 rounded-xl px-4 py-2">
                                        <FaGrinStars className="w-6 h-6 text-gray-200" />
                                        <p className="text-2xl font-inter text-gray-200">Play again!</p>
                                    </Link>
                                    <Link to="/dashboard" className="bg-gray-800 flex items-center space-x-4 rounded-xl px-4 py-2">
                                        <FaHome className="w-6 h-6 text-gray-200" />
                                        <p className="text-2xl font-inter text-gray-200">Home</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="opacity-70 fixed inset-0 z-40 bg-black"></div>
                </div>
            }
        </div>
    );
};

export default Gameover;
