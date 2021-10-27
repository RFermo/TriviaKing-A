import { FaGoogle, FaUser, FaKey } from "react-icons/fa";
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Returns true if user is logged in
// otherwise returns false
const isAuthorized = async () => {
    const response = await Axios.get('http://localhost:4000/verify', {withCredentials: true});
    return response.data.isAuthenticated;
};

// Logs user out and returns the response
const logout = async () => {
    const response = await Axios.get("http://localhost:4000/logout", {withCredentials: true});
    return response;
}

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState("none");
    // const [incorrect, setIncorrect] = useState(false);
    const history = useHistory();

    useEffect(() => {
        ( async () => {
            const auth = await isAuthorized();
            if (auth) history.push('/dashboard');
        }) ();
    }, []);

    const loginUser = async (event) => {

        event.preventDefault();
        try {
            const response = await Axios.post("http://localhost:4000/login", {
                username: username,
                password: password
            }, {withCredentials: true});

            const user_login_feedback = response.data;

            if (user_login_feedback.isAuthenticated) {
                history.push("/dashboard"); // If user successfully logs in, push him to dashboard page
            }
            else {
                setLoginStatus(user_login_feedback.message);
            }
        }

        catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-tr from-purple-900 to-purple-700">
  
            <div className="w-5/6 lg:w-11/12 xl:w-4/5 2xl:w-3/5 flex flex-col lg:flex-row my-10 lg:my-0">
                <div className="lg:w-1/2">
                    <img className="h-[250px] md:h-[375px] lg:h-[620px] xl:h-[630px] w-full object-cover rounded-tr-xl lg:rounded-tr-none rounded-tl-xl lg:rounded-bl-xl" 
                        src="https://cdn.pixabay.com/photo/2018/03/21/07/16/learning-3245793_960_720.jpg" 
                        alt="Light bulb" 
                    />
                </div>

                <div className="lg:w-1/2 lg:h-[620px] xl:h-[630px] bg-gray-100 rounded-br-xl rounded-bl-xl lg:rounded-bl-none lg:rounded-tr-xl py-8">
                    <h1 className="text-4xl cursor-default md:text-5xl text-center font-georama text-purple-900 font-extrabold tracking-wider">Trivia King</h1>

                    <div className="w-4/5 mx-auto flex flex-col space-y-5 md:space-y-5 mt-10 lg:mt-6">

                        <a href="/" className="google-btn">
                            <div className="flex items-center justify-center md:justify-start space-x-3">
                                <div>
                                    <FaGoogle className="w-5 h-5 md:w-6 md:h-6"/>
                                </div>
                                
                                <div className="font-inter xl:text-lg">
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
                            <div className="relative">
                                <label className="md:text-lg font-inter font-bold">Username</label>
                                <FaUser className="absolute bottom-[11px] left-[20px]" />
                                <input 
                                    className="input-field" 
                                    type="text"
                                    required={true}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="mt-4 relative">
                                <label className="md:text-lg font-inter font-bold">Password</label>
                                <FaKey className="absolute bottom-[11px] left-[20px]" />
                                <input 
                                    className="input-field" 
                                    type="password"
                                    required={true}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="mt-8 lg:mt-6">
                                <button type="submit" className="sign-up-login-btn">
                                    LOGIN
                                </button>
                            </div>
                        </form>

                        <div className={`bg-red-600 w-max p-2 rounded-md cursor-default ${loginStatus === "none" ? "hidden" : "block"}`}>
                            <p className="font-inter text-gray-200">{loginStatus}</p>
                        </div>

                        <div className="text-sm font-inter flex space-x-2 font-light pt-1">
                            <div>
                                Forgot your password?
                            </div>
                            <Link to="/" className="underline font-bold inline-block">Click here</Link>
                        </div>

                        <div className="text-sm font-inter font-light flex justify-start space-x-2 pt-1">
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