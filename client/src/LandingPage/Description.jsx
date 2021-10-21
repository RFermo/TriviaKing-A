import { FaCheckSquare } from "react-icons/fa";

const Description = () => {
    return (
        <div className="lg:w-1/2 min-h-screen-utr lg:min-h-screen bg-gradient-to-b from-black to-gray-700 flex items-center justify-center">
            <div className="w-4/5 mx-auto">
                <h1 className="text-white text-3rmtext lg:text-5xl text-center lg:leading-relaxed font-inter">A unique trivia application that will test every fiber of your knowledge.</h1>

                <div className="flex flex-col space-y-5 mt-10">
                    <div className="flex space-x-4 items-center">
                        <div>
                            <FaCheckSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h5 className="font-georama text-lg text-white">Distinctive lifeline system</h5>
                        </div>
                    </div>

                    <div className="flex space-x-4 items-center">
                        <div>
                            <FaCheckSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h5 className="font-georama text-lg text-white">Ability to see your friends' scores</h5>
                        </div>
                    </div>

                    <div className="flex space-x-4 items-center">
                        <div>
                            <FaCheckSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h5 className="font-georama text-lg text-white">Secure registration/login system</h5>
                        </div>
                    </div>

                    <div className="flex space-x-4 items-center">
                        <div>
                            <FaCheckSquare className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h5 className="font-georama text-lg text-white">Huge database of questions</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Description;