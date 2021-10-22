import { FaGoogle } from "react-icons/fa";
import Axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("");

    const loginUser = async (event) => {

        event.preventDefault();

        try {
            const response = await Axios.post("http://localhost:4000/login", {
                username: username,
                password: password
            });

            console.log(response.data);
        }

        catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-tr from-purple-900 to-purple-700">
            <div className="w-11/12 md:w-5/6 lg:w-4/5 2xl:w-3/5 flex flex-col lg:flex-row">
                <div className="lg:w-1/2">
                    <img className="h-[200px] md:h-[400px] lg:h-[570px] w-full object-cover rounded-tr-xl lg:rounded-tr-none rounded-tl-xl lg:rounded-bl-xl" src="https://cdn.pixabay.com/photo/2018/03/21/07/16/learning-3245793_960_720.jpg" alt="Light bulb" />
                </div>

                <div className="lg:w-1/2 md:h-[570px] bg-white rounded-br-xl rounded-bl-xl lg:rounded-bl-none lg:rounded-tr-xl py-4 md:py-8">
                    <h1 className="text-4xl md:text-5xl text-center font-georama text-purple-900 font-extrabold tracking-wider">Trivia King</h1>

                    <div className="w-4/5 mx-auto flex flex-col space-y-2 md:space-y-5 mt-6">
                        {/* <div className="text-2xl md:text-3xl font-inter font-extrabold">
                            Login
                        </div> */}

                        <a href="/" className="border-2 rounded-lg border-black py-2.5 md:pl-4 fill-link hover:text-white">
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

                        <form onSubmit={loginUser}>
                            <div>
                                <label className="text-lg font-inter font-bold">Username</label>
                                <input 
                                    className="input-field" 
                                    type="text"
                                    required={true}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mt-4">
                                <label className="text-lg font-inter font-bold">Password</label>
                                <input 
                                    className="input-field" 
                                    type="password"
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="mt-2.5 font-inter text-red-600">{loginStatus}</p>
                            </div>

                            <div className="mt-6 md:mt-6">
                                <button type="submit" className="sign-up-btn">
                                    LOGIN
                                </button>
                            </div>
                        </form>

                        <div className="text-sm font-inter font-light flex justify-center lg:justify-start space-x-2 pt-2">
                            <div>
                                Don't have an account?
                            </div>
                            <Link to="/" className="underline font-bold">Sign up here</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
 
export default Login;