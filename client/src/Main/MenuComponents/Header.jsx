import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import TKlogo from "../TKLogo.png";


const Header = () => {

    const [menuButton, setMenuButton] = useState(false);

    return (
        <div className="bg-gray-200 sticky top-0 z-50 flex items-center justify-around py-4">
            
            <div>
                <img className="w-[50px] h-[50px]" src={TKlogo} alt="Trivia King logo" />
            </div>
           
            <div>
                <h1 className="text-4xl cursor-default text-center font-georama text-purple-900 font-extrabold tracking-wider">Trivia King</h1>
            </div>

            <div>
                <button onClick={() => setMenuButton(!menuButton)} className="rounded-full bg-gray-800 px-2 py-2">
                    <HiMenu className={`${menuButton ? "hidden" : "block"} w-6 h-6 transition duration-300 transform text-white`} />
                    <HiX className={`${menuButton ? "block" : "hidden"} w-6 h-6 transition duration-300 transform text-white`} />
                </button>
            </div>
        </div>
    );
};
 
export default Header;