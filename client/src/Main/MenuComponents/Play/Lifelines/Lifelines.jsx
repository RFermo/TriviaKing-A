import React from 'react'
import { FaExchangeAlt } from "react-icons/fa";

const Lifelines = (props) => {

    const lifelineDisabler = () => {
        if (props.disableLifeline || props.userClicked || props.currTime === 0) {
            return true;
        }

        return false;
    };

    return (
        <div className="flex space-x-9 mx-auto">

            <button disabled={lifelineDisabler()} onClick={() => {
                props.setDisableLifeline(true);
                props.setAmount50Used(props.amount50Used + 1);
                props.fiftyFifty();
            }} 
                className={`bg-gray-800 ${lifelineDisabler() ? `opacity-40` : `opacity-100`} rounded-lg px-3 py-3 relative shadow-xl`}
            >
                <p className="text-gray-200 text-lg font-georama">50:50</p>
                <div className="absolute -bottom-3 -right-3 rounded-full w-max h-6 px-2 bg-gray-200 shadow-xl">
                    <p className="font-georama">6</p>
                </div>
            </button>

            <button disabled={lifelineDisabler()} onClick={() => {
                props.setDisableLifeline(true);
                props.setAmountChangeUsed(props.amountChangeUsed + 1);
                props.changeQuestionHandler();
            }} 
            
                className={`bg-gray-800 ${lifelineDisabler() ? `opacity-40` : `opacity-100`} rounded-lg px-3 py-2 relative shadow-xl`}
            >
                <FaExchangeAlt className="w-6 h-6 text-gray-200" />
                <div className="absolute -bottom-3 -right-3 rounded-full w-max h-6 px-2 bg-gray-200 shadow-xl">
                    <p className="font-georama">6</p>
                </div>
            </button>

        </div>
    );
};

export default Lifelines;
