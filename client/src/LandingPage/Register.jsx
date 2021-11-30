import { FaUser, FaKey } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import TKlogo from "../Main/images/TKLogo.png";
import { GoogleLogin } from 'react-google-login';

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("none");

    const registerUser = async (event) => {

        event.preventDefault();

        try {
            let registrationResponse = await Axios.post("http://localhost:4000/user/register", {
                username: username,
                email: email,
                password: password
            });
            registrationResponse = registrationResponse.data;

            if (registrationResponse.success) {
                const response = await Axios.post("http://localhost:4000/user/login", {
                    username: username,
                    password: password
                }, { withCredentials: true });

                const user_login_feedback = response.data;

                if (user_login_feedback.isAuthenticated) {
                    window.location.replace("http://localhost:3000/dashboard");
                }
            }

            else {
                setRegisterStatus(registrationResponse.message);
            }
        }

        catch (err) {
            console.error(err);
        }
    };

    let handleGoogleLogin = async (data) => {
        try {
            const response = await Axios.post('http://localhost:4000/user/login/google', {
                username: data.tokenId,
                token: data.tokenId
            }, { withCredentials: true })
            if (response.data.isAuthenticated) window.location.replace('http://localhost:3000/dashboard');
        } catch (error) {
            if (error.response.data === 'Unauthorized') setRegisterStatus("Invalid login data!");
            else setRegisterStatus('Oops! Something went wrong.')
        }
    }

    return (

        <div className="w-4/5 mx-auto lg:w-1/2 lg:min-h-screen lg:flex lg:items-center py-8 xl:py-14 2xl:py-0 bg-gray-100">

            <div className="lg:w-4/5 2xl:w-3/5 mx-auto">

                <img className="w-16 h-16 mx-auto" src={TKlogo} alt="Trivia King logo" />
                <h1 className="text-5xl mt-4 md:text-6xl cursor-default text-center font-georama text-purple-900 font-extrabold tracking-wider">Trivia King</h1>

                <div className="flex flex-col space-y-6 mt-12">
                    <div className="text-3xl cursor-default md:text-4xl font-inter font-extrabold">
                        Signup
                    </div>

                    <GoogleLogin
                        clientId="83841563782-lu59i4jj47gpufaus6k6621r9k2oi9r8.apps.googleusercontent.com"
                        className="!font-inter !text-lg !text-gray-800 !rounded-lg"
                        buttonText="Signup with Google"
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleLogin}
                        cookiePolicy={'single_host_origin'}
                    />

                    <div className="flex items-center space-x-3">
                        <div className="border-t-2 border-gray-300 w-full"></div>
                        <div className="text-gray-400 font-inter">OR</div>
                        <div className="border-t-2 border-gray-300 w-full"></div>
                    </div>

                    <form data-testid="registerForm" onSubmit={registerUser}>
                        <div className="relative">
                            <label className="text-lg font-inter font-bold">Username</label>
                            <p className="text-xs md:text-sm font-inter font-light">Between 4 and 16 characters long, hyphen and dash allowed</p>
                            <FaUser className="absolute bottom-[11px] left-[20px]" />
                            <input 
                                className="input-field"
                                data-testid="name-field" 
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
                                data-testid="email-input" 
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
                                data-testid="password-field"
                                type="password"
                                required={true}
                                pattern="^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9-_]+"
                                minLength={8}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="pt-2 mt-6">
                            <button data-testid="signup" type="submit" className="sign-up-login-btn">
                                SIGN UP
                            </button>
                        </div>
                    </form>

                    <div data-testid="signup_error" className={`${registerStatus === "none" ? "hidden" : "block"} bg-red-600 w-max p-2 rounded-md cursor-default`}>
                        <p className="font-inter text-gray-200">{registerStatus}</p>
                    </div>

                    <div className="font-inter font-light flex space-x-2">
                        <div>
                            Already have an account?
                        </div>
                        <a href="/login" className="underline font-bold">Login here</a>
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