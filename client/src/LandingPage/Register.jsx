import { FaGoogle, FaUser, FaKey } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";
import TKlogo from "../Main/images/TKLogo.png";

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("none");
    const history = useHistory();

    const registerUser = async (event) => {

        event.preventDefault();
    
        try {
            const response = await Axios.post("http://localhost:4000/register", {
                username: username,
                email: email,
                password: password
            });

            const user_reg_feedback = response.data.message;

            if (user_reg_feedback === "User created") {

                /*
                    Maybe do some token handling stuff here to prevent users from going back to signup if they 
                    signed up already?
                */ 

                history.push("/dashboard"); // If user is authenticated push him to dashboard page
            }

            else {
                setRegisterStatus(user_reg_feedback);
            }
        }
    
        catch (err) {
            console.error(err);
        }
    };

    return (
        
        <div className="w-4/5 mx-auto lg:w-1/2 lg:min-h-screen lg:flex lg:items-center py-8 xl:py-14 2xl:py-0 bg-gray-100">

            <div className="lg:w-4/5 2xl:w-3/5 mx-auto">

                <img className="w-16 h-16 mx-auto" src={TKlogo} alt="Trivia King logo" />
                <h1 className="text-5xl mt-4 md:text-6xl cursor-default text-center font-georama text-purple-900 font-extrabold tracking-wider">Trivia King</h1>
                
                <div className="flex flex-col space-y-6 mt-12">
                    <div className="text-3xl cursor-default md:text-4xl font-inter font-extrabold">
                        Signup
                    </div>

                    <a href="/" className="google-btn">
                        <div className="flex items-center justify-center md:justify-start space-x-3">
                            <div>
                                <FaGoogle className="w-6 h-6"/>
                            </div>
                            
                            <div className="text-lg font-inter">
                                Continue with Google
                            </div>
                        </div>
                    </a>

                    <div className="flex items-center space-x-3">
                        <div className="border-t-2 border-gray-300 w-full"></div>
                        <div className="text-gray-400 font-inter">OR</div>
                        <div className="border-t-2 border-gray-300 w-full"></div>
                    </div>

                    <form onSubmit={registerUser}>
                        <div className="relative">
                            <label className="text-lg font-inter font-bold">Username</label>
                            <p className="text-xs md:text-sm font-inter font-light">Between 4 and 16 characters long, hyphen and dash allowed</p>
                            <FaUser className="absolute bottom-[11px] left-[20px]" />
                            <input 
                                className="input-field" 
                                type="text"
                                required={true}
                                pattern="[a-zA-Z0-9-_]+"
                                minLength={4}
                                maxLength={16}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 relative">
                            <label className="text-lg font-inter font-bold">Email</label>
                            <HiOutlineMail className="absolute bottom-[11px] left-[20px] w-5 h-5" />
                            <input 
                                className="input-field" 
                                type="email"
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mt-4 relative">
                            <label className="text-lg font-inter font-bold">Password</label>
                            <p className="text-xs md:text-sm font-inter font-light" >At least 8 characters long, at least a number, at least an uppercase letter</p>
                            <FaKey className="absolute bottom-[11px] left-[20px]" />
                            <input 
                                className="input-field" 
                                type="password"
                                required={true}
                                pattern="^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9-_]+"
                                minLength={8}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="pt-2 mt-6">
                            <button type="submit" className="sign-up-login-btn">
                                SIGN UP
                            </button>
                        </div>
                    </form>

                    <div className={`${registerStatus === "none" ? "hidden" : "block"} bg-red-600 w-max p-2 rounded-md cursor-default`}>
                        <p className="font-inter text-gray-200">{registerStatus}</p>
                    </div>
                    
                    <div className="font-inter font-light flex space-x-2">
                        <div>
                            Already have an account?
                        </div>
                        <Link to="/login" className="underline font-bold">Login here</Link>
                    </div>

                </div>
            
                <div className="mt-6 font-inter font-light">
                    By signing up, you agree to our <Link to="/privacy" className="underline font-bold">Privacy Policy</Link> and <Link to="/terms" className="underline font-bold">Terms of Use</Link> 
                </div>
            </div>
        </div>
    );
};
 
export default Register;