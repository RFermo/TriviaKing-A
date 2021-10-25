const Home = () => {
    return (
        <div className="w-3/4 overflow-y-auto">
            <div id="slider" className="mt-20 bg-yellow-400 w-max mx-auto px-8 py-4 rounded-xl flex space-x-5 items-center slide-bottom">
                <span className="wave text-4xl">👋</span>
                <h1 className="text-5xl font-inter text-gray-900">Welcome back Michael!</h1>
            </div>

            <div className="mt-16 flex justify-center space-x-16">
                <button className="how-to-play focus:outline-none relative w-2/5 h-[300px] rounded-lg hover:scale-105 transition ease-out duration-200">
                    <h1 className="bg-gray-200 px-4 py-2 rounded-lg text-gray-900 font-georama absolute top-1/2 left-1/2 text-3xl">HOW TO PLAY</h1>
                </button>

                <button className="store bg-gray-200 relative w-2/5 h-[300px] rounded-lg hover:scale-105 transition ease-out duration-200">
                    <h1 className="bg-gray-900 px-4 py-2 w-5/6 rounded-lg text-white font-inter absolute top-1/2 left-1/2 text-3xl">STORE (Coming soon)</h1>
                </button>
            </div>

            
        </div>
    );
};
 
export default Home;