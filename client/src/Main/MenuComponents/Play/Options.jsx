const Options = (props) => {

    return (
        <button 
            onClick={(e) => {
                props.checkAnswer(e, props.id)
            }} 
            value={props.option}
            className={`${props.class}`}
        >
            {props.option}
        </button>
    );
};
 
export default Options;