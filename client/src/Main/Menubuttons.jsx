const Menubuttons = (props) => {
    return (
        <button 
            onClick={() => props.setStateComponent(props.title)} 
            className={`${props.btnClass} ${(props.stateComponent === props.title && props.title !== "Logout") ? `!bg-yellow-700` : null}`}>

            <div>
                <props.icon className={props.iconClass} />
            </div>

            <div className="font-inter text-2xl text-white">
                {props.title}
            </div>
        </button>
    );
};
 
export default Menubuttons;