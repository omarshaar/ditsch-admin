import React from "react";
import "./button.css";

const Button = (props) => {
    const style = props.style;
    const children = props.children;
    const className = props.className;

    return (
        <button style={style} className={className + " mainButton"} onClick={props.onClick} >
            { children }
        </button>
    );
}

export default Button;