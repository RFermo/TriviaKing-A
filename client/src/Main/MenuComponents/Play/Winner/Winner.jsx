import Axios from "axios";
import React, { useState, useEffect } from 'react';
import TKLogo from "../../../images/TKLogo.png";
import WinnerSound from "../sounds/Winner.mp3";
import { Link } from 'react-router-dom';
import { FaGrinStars, FaHome } from 'react-icons/fa';

const winner_sound = new Audio(WinnerSound);

const Winner = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {

        const fetchUserData = async () => {

            try {
                const userResponse = await Axios.get("http://localhost:4000/user/get_profile", {withCredentials: true});
                setUserData(userResponse.data.message);
            }

            catch (err) {
                console.error(err);
            }
        };

        const interval = setInterval(() => {
            setShowModal(true);
        }, 1500);

        fetchUserData();

        return () => clearInterval(interval)
    }, []);

    useEffect(() => {

        const updateUserData = async () => {

            try {

                if (props.score === 0 && (props.amount50Used === 0 && props.amountChangeUsed === 0)) {
                    return;
                }

                else {
                    const response = await Axios.put("http://localhost:4000/user/update_profile", {
                        highscore: props.score,
                        num_correct_answers: userData.num_correct_answers + props.score,
                        remaining_fifty_fiftys: userData.remaining_fifty_fiftys - props.amount50Used,
                        remaining_change_questions: userData.remaining_change_questions - props.amountChangeUsed,
                        times_won: userData.times_won + 1
                    }, {withCredentials: true});

                    console.log(response.data);
                }
            }

            catch (err) {
                console.error(err);
            }
        };

        const interval = setInterval(() => {
            setWinner(true);
        }, 1500);

        updateUserData();

        return () => clearInterval(interval)

    }, [props.score, userData.highscore, props.amount50Used, props.amountChangeUsed, userData.num_correct_answers, userData.remaining_change_questions, userData.remaining_fifty_fiftys, userData.times_won]);

    const playWinner = () => {
        winner_sound.play();
    };

    return (
        <div>
            { (showModal && userData) &&
                <div>
                    <div id="slider" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none slide-in">
                        <div className="relative my-6 mx-auto w-5/6 lg:w-3/4 xl:w-[700px]">
                            <div className="border-0 rounded-lg relative flex flex-col space-y-7 w-full bg-gray-200 px-6 py-10 outline-none focus:outline-none">

                                <img className="w-32 h-32 mx-auto" src={TKLogo} alt="Trivia King logo" />
                                <div className="w-11/12 mx-auto">
                                    <div className="bg-purple-900 px-4 py-3 md:w-max md:mx-auto rounded-lg shadow-2xl">
                                        <h1 className="uppercase font-inter text-gray-200 text-lg xl:text-2xl">Congrats! You are an authentic Trivia King!</h1>
                                    </div>
                                </div>

                                <ul className="flex flex-col list-disc list-inside space-y-3">
                                    <li className="text-xl xl:text-2xl font-inter">
                                        User: <span className="font-semibold">RFermo98</span>
                                    </li>
                                    <li className="text-xl xl:text-2xl font-inter">
                                        Score: <span className="font-semibold">{props.score}</span>
                                    </li>
                                    {/* <li className="text-xl xl:text-2xl font-inter">
                                        Highest score: <span className="font-semibold">10</span>
                                    </li> */}
                                    <li className="text-xl xl:text-2xl font-inter">
                                        Lifelines used: <span className="font-semibold">{props.amount50Used + props.amountChangeUsed}</span>
                                    </li>
                                </ul>

                                <div className="flex flex-col space-y-7 xl:flex-row xl:space-y-0 xl:space-x-10 mx-auto">
                                    <button onClick={() => window.location.reload()} className="bg-gray-800 flex items-center justify-center xl:justify-start space-x-4 rounded-xl px-4 py-2">
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

                    { winner ? playWinner() : null }
                </div>
            }
        </div>
    );
};

export default Winner;
