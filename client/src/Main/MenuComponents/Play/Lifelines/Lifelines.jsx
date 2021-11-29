import React from 'react'
import { FaExchangeAlt } from "react-icons/fa";

const Lifelines = ({disableLifeline, userClicked, currTime, curr5050, amount50Used, amountChangeUsed, currChange, setDisableLifeline, setCurr5050, setAmount50Used, fiftyFifty, setCurrChange, setAmountChangeUsed, changeQuestionHandler}) => {

    const lifelineDisabler = () => {
        if (disableLifeline || userClicked || currTime === 0) {
            return true;
        }

        return false;
    };

    const fiftyDisabler = () => {
        if (curr5050 === 0) {
            return true;
        }

        return false;
    };

    const changeDisabler = () => {
        if (currChange === 0) {
            return true;
        }

        return false;
    };

    return (
        <div className="flex space-x-9 mx-auto">

            <button disabled={lifelineDisabler() || fiftyDisabler()} onClick={() => {
                setDisableLifeline(true);
                setCurr5050(curr5050 - 1);
                setAmount50Used(amount50Used + 1);
                fiftyFifty();
            }} 
                className={`bg-gray-800 ${lifelineDisabler() || fiftyDisabler() ? `opacity-40` : `opacity-100`} rounded-lg px-3 py-3 relative shadow-xl`}
            >
                <p className="text-gray-200 text-lg font-georama">50:50</p>
                <div className="absolute -bottom-3 -right-3 rounded-full w-max h-6 px-2 bg-gray-200 shadow-xl">
                    <p className="font-georama">{curr5050}</p>
                </div>
            </button>

            <button disabled={lifelineDisabler() || changeDisabler()} onClick={() => {
                setDisableLifeline(true);
                setCurrChange(currChange - 1);
                setAmountChangeUsed(amountChangeUsed + 1);
                changeQuestionHandler();
            }} 
            
                className={`bg-gray-800 ${lifelineDisabler() || changeDisabler() ? `opacity-40` : `opacity-100`} rounded-lg px-3 py-2 relative shadow-xl`}
            >
                <FaExchangeAlt className="w-6 h-6 text-gray-200" />
                <div className="absolute -bottom-3 -right-3 rounded-full w-max h-6 px-2 bg-gray-200 shadow-xl">
                    <p className="font-georama">{currChange}</p>
                </div>
            </button>

        </div>
    );
};

export default Lifelines;
