import React, { createRef } from "react";

const buttonRef = createRef();

const Options = (props) => {
    
    return (
        <button
            ref={buttonRef}
            onClick={(e) => {
                props.setUserClicked(true);
                props.checkAnswer(e, props.id)
            }} 
            value={props.option}
            className={`${props.class}`}
        >
            {props.option}
        </button>
    );
};
 
export {Options, buttonRef};