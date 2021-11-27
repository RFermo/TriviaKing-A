import React, { useEffect } from 'react';
import wrongSound from "../sounds/wrong.wav";

const wrong_audio = new Audio(wrongSound);

const Countdown = (props) => {

    useEffect(() => {

        if (props.userClicked) {
            props.setUserClicked(false);
            return;
        }

        if (props.curr === 0) {
            props.setCurr(0);
            wrong_audio.play();
            return;
        }

        const interval = setInterval(() => {
            props.setCurr(props.curr - 1);
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <div className="text-2xl bg-gray-800 text-gray-200 w-10 h-10 xl:w-14 xl:h-14 font-georama flex justify-center items-center rounded-full">
            {props.curr}
        </div>
    );
};

export default Countdown;
