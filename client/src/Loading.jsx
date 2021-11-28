import React from 'react';
import { FaFrown } from 'react-icons/fa';


const Loading = () => {
    
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-800">
            <div className="w-85 lg:w-11/12 flex flex-col items-center space-y-5">
                <FaFrown className="w-16 h-16 mx-auto text-gray-200" />
                <h1 className="text-gray-200 text-xl md:text-2xl leading-normal font-inter font-bold">The app seems to be down buddy. Perhaps it's a good time to get knowledge somewhere else while we fix it?</h1>
            </div>
        </div>
    );
};

export default Loading;
