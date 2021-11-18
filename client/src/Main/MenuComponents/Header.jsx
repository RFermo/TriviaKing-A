import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import TKlogo from "../TKLogo.png";
import { FaCrown, FaHome, FaSignOutAlt, FaUser, FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {

    // Need to work on mobile sidebar

    const [menuButton, setMenuButton] = useState(false);

    const logout = async () => {
        await axios.get("http://localhost:4000/logout", { withCredentials: true });
        window.location.replace("http://localhost:3000/login")
    };

    return (
        <div>
            <div className="bg-gray-200 flex justify-around sticky top-0 z-30 py-6">
                <div className="flex items-center space-x-4">
                    <img className="w-20 h-20 xl:w-16 xl:h-16" src={TKlogo} alt="Trivia King logo" />
                    <h1 className="lg:text-5xl xl:text-[42px] font-georama cursor-default text-purple-900 font-extrabold tracking-wider">Trivia King</h1>
                </div>

                <div className="block xl:hidden my-auto">
                    <div className="flex items-center">
                        <button
                            onClick={() => setMenuButton(!menuButton)}
                            className="bg-gray-800 rounded-full px-2 py-2"
                         >
                            <HiMenu className={`text-gray-200 ${menuButton ? "hidden" : "block"} w-8 h-8`} />
                            <HiX className={`text-gray-200 ${menuButton ? "block" : "hidden"} w-8 h-8`} />
                        </button>
                    </div>
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

                        <Link to="/friends" className="flex bg-gray-800 items-center space-x-4 rounded-xl px-4 py-2">
                            <FaUserFriends className="text-gray-200 w-5 h-5" />
                            <p className="text-2xl text-gray-200">Friends</p>
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