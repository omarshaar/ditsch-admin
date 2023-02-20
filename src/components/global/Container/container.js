import React from "react";

export const Containery = (props) =>{

    const childern = props.children

    return (
        <div className="Containery" style={{ padding: "var(--padding)" , width: "100%" , height: "100%" , margin: "0 auto"}}>
            { childern }
        </div>
    )
}