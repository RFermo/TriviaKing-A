import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

// Add user, email, password icons inside inputs with React Icons.

const Register = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async (event) => {

        event.preventDefault();
    
        try {
            const response = await Axios.post("http://localhost:4000/register", {
                username: username,
                email: email,
                password: password
            });
    
            console.log(response);
        }
    
        catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="w-4/5 mx-auto lg:w-1/2 lg:min-h-screen lg:flex lg:items-center py-8 xl:py-14 2xl:py-0 bg-white">

            <div className="lg:w-4/5 2xl:w-3/5 mx-auto">
                <h1 className="text-5xl md:text-6xl text-center font-georama text-purple-900 font-extrabold tracking-wider">Trivia King</h1>
                
                <div className="flex flex-col space-y-5 mt-16">
                    <div className="text-3xl md:text-4xl font-inter font-extrabold">
                        Signup
                    </div>

                    <a href="/" className="border-2 rounded-lg border-black py-2.5 pl-4 fill-link hover:text-white">
                        <div className="flex items-center space-x-3">
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
                        <div>
                            <label className="text-lg font-inter font-bold">Username</label>
                            <p className="text-sm font-inter font-light">At least 4 characters long, hyphen and dash allowed</p>
                            <input 
                                className="input-field" 
                                type="text"
                                required={true}
                                pattern="[a-zA-Z0-9-_]+"
                                minLength={4}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="text-lg font-inter font-bold">Email</label>
                            <input 
                                className="input-field" 
                                type="email"
                                required={true}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mt-4">
                            <label className="text-lg font-inter font-bold">Password</label>
                            <p className="text-sm font-inter font-light" >At least 8 characters long, at least a number, at least an uppercase letter</p>
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
                            <button type="submit" className="sign-up-btn">
                                SIGN UP
                            </button>
                        </div>
                    </form>


                    <div className="text-sm font-inter font-light flex space-x-2">
                        <div>
                            Already have an account?
                        </div>
                        <Link to="/login" className="underline font-bold">Login here</Link>
                    </div>

                </div>
            
                <div className="mt-8 font-inter text-center font-light">
                    By signing up, you agree to our <span className="underline font-bold">Privacy Policy</span> and <span className="underline font-bold">Terms of Use</span> 
                </div>
            </div>
      </div>
    );
};
 
export default Register;