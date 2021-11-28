import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import TKlogo from "../../images/TKLogo.png";
import { FaCrown, FaHome, FaSignOutAlt, FaUser, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {

    const [menuButton, setMenuButton] = useState(false);

    const logout = async () => {
        await axios.delete("http://localhost:4000/user/logout", { withCredentials: true });
        window.location.replace("http://localhost:3000/login")
    };

    return (
        <div className="sticky top-0 z-30">
            <div className="bg-gray-200 flex justify-around py-4 md:py-5">

                <div className="block xl:hidden my-auto">
                    <div className="flex items-center">
                        <button
                            onClick={() => setMenuButton(!menuButton)}
                            className="bg-gray-800 rounded-full px-2 py-2"
                         >
                            <HiMenu className="text-gray-200 w-7 h-7 md:w-10 md:h-10" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <img className="w-14 h-14 md:w-16 md:h-16 xl:w-16 xl:h-16" src={TKlogo} alt="Trivia King logo" />
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[42px] font-georama cursor-default text-purple-900 font-extrabold tracking-wider">Trivia King</h1>
                </div>
                    

                <div className={`${menuButton ? `block` : `hidden`} `}>
                    <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        
                        <div className="w-[300px] h-full bg-gray-200">
                            <div className="w-4/5 mx-auto pt-2">
                                <div className="text-right">
                                    <button className="bg-gray-800 px-3 py-2 rounded-lg" onClick={() => setMenuButton(!menuButton)}>
                                        <HiX className="w-5 h-5 text-gray-200" />
                                    </button>
                                </div>

                                <div className="flex flex-col pt-5 space-y-3 mx-auto items-center">
                                    <img className="w-20 h-20 xl:w-16 xl:h-16" src={TKlogo} alt="Trivia King logo" />
                                    <h1 className="text-4xl font-georama cursor-default text-purple-900 font-extrabold tracking-wider">Trivia King</h1>
                                </div>

                                <div className="flex flex-col w-4/5 mx-auto space-y-8 pt-14">
                                    <Link to="/dashboard" className="flex bg-gray-800 items-center justify-center space-x-4 rounded-xl px-4 py-2">
                                        <FaHome className="text-gray-200 w-5 h-5" />
                                        <p className="text-2xl text-gray-200">Home</p>
                                    </Link>

                                    <Link to="/play" className="flex bg-gray-800 items-center justify-center space-x-4 rounded-xl px-4 py-2">
                                        <FaCrown className="text-gray-200 w-5 h-5" />
                                        <p className="text-2xl text-gray-200">Play</p>
                                    </Link>

                                    <Link to="/profile" className="flex bg-gray-800 items-center justify-center space-x-4 rounded-xl px-4 py-2">
                                        <FaUser className="text-gray-200 w-5 h-5" />
                                        <p className="text-2xl text-gray-200">Profile</p>
                                    </Link>

                                    <button onClick={logout} className="flex bg-gray-800 items-center justify-center space-x-4 rounded-xl px-4 py-2">
                                        <FaUserFriends className="text-gray-200 w-5 h-5" />
                                        <p className="text-2xl text-gray-200">Logout</p>
                                    </button>
                                </div>
                                
                            </div>
                            
                        </div>
                    </div>
                    <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
                </div>
                


                <div className="hidden xl:block my-auto">
                    <div className="flex items-center space-x-7 2xl:space-x-10">
                        <Link to="/dashboard" className="flex bg-gray-800 items-center space-x-4 rounded-xl px-4 py-2">
                            <FaHome className="text-gray-200 w-5 h-5" />
                            <p className="text-2xl text-gray-200">Home</p>
                        </Link>

                        <Link to="/play" className="flex bg-gray-800 items-center space-x-4 rounded-xl px-4 py-2">
                            <FaCrown className="text-gray-200 w-5 h-5" />
                            <p className="text-2xl text-gray-200">Play</p>
                        </Link>

                        <Link to="/profile" className="flex bg-gray-800 items-center space-x-4 rounded-xl px-4 py-2">
                            <FaUser className="text-gray-200 w-5 h-5" />
                            <p className="text-2xl text-gray-200">Profile</p>
                        </Link>

                        <button onClick={logout} className="flex bg-gray-800 items-center space-x-4 rounded-xl px-4 py-2">
                            <FaSignOutAlt className="text-gray-200 w-5 h-5" />
                            <p className="text-2xl text-gray-200">Logout</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default Header;