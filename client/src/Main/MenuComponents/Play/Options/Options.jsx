import React from "react";

const Options = (props) => {
    
    return (
        <button
            disabled={props.userClicked || props.currTime === 0}
            onClick={(e) => {
                props.setUserClicked(true);
                props.checkAnswer(e)
            }} 
            value={props.option}
            className={`${props.class}`}
        >
            {props.option}
        </button>
    );
};
 
export default Options;