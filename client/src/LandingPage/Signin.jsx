import { FaGoogle } from "react-icons/fa";

// Add user, email, password icons inside inputs with React Icons.

const Signin = () => {
    return (
        <div className="w-1/2 min-h-screen flex items-center xl:py-14 2xl:py-0 bg-white">

            <div className="lg:w-4/5 xl:w-3/5 mx-auto">
                <h1 className="text-6xl text-center font-georama text-purple-900 font-extrabold tracking-wider">Trivia King</h1>
                
                <div className="flex flex-col space-y-5 mt-16">
                    <div className="text-4xl font-inter font-extrabold">
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

                    <div>
                        <label className="text-lg font-inter font-bold">Username</label>
                        <input className="bg-gray-200 rounded-sm w-full p-2 mt-4 font-inter" type="text" />
                    </div>

                    <div>
                        <label className="text-lg font-inter font-bold">Email</label>
                        <input className="bg-gray-200 rounded-sm w-full p-2 mt-4 font-inter" type="email" />
                    </div>

                    <div>
                        <label className="text-lg font-inter font-bold">Password</label>
                        <input className="bg-gray-200 rounded-sm w-full p-2 mt-4 font-inter" type="password" />
                    </div>

                    <div className="pt-2">
                        <button className="bg-purple-600 hover:bg-purple-900 py-2 rounded-md w-full text-gray-200 font-inter">
                            SIGN UP
                        </button>
                    </div>

                    <div className="text-sm font-inter font-light">
                        Already have an account? <span className="underline font-bold">Login here</span>
                    </div>

                </div>
            
                <div className="mt-16 font-inter text-center font-light">
                    By signing up, you agree to our <span className="underline font-bold">Privacy Policy</span> and <span className="underline font-bold">Terms of Use</span> 
                </div>
            </div>
      </div>
    );
}
 
export default Signin;