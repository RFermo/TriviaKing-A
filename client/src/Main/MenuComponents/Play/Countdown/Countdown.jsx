import React from 'react';
import useCountdown from './useCountdown';

const Countdown = (props) => {
    const timeLeft = useCountdown(props.curr, props.setCurr, props.userClicked, props.setUserClicked);
    return (
        <div className="text-2xl bg-gray-800 text-gray-200 w-14 h-14 font-georama flex justify-center items-center rounded-full">
            {timeLeft}
        </div>
    );
};

export default Countdown;
