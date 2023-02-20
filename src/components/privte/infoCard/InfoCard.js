import React from "react";
import "./InfoCard.css";

export const InfoCard = (props) =>{

    const title = props.title;
    const updown = props.updown;
    const value = props.value;
    const linkTitle = props.linkTitle;
    const icon = props.icon;
    let isUp = updown.includes('+');
    let isDown = updown.includes('-');
    let isNull = !isUp && !isDown;


    return(
        <div className="InfoCard cardContainer d-flex justify-content-between flex-column">
            
            <div className="TitleInfoCard d-flex justify-content-between align-items-center">
                
                <p className="p2" style={{opacity: 0.7}}> { title } </p>
                
                <p className= { !isNull ? isUp ? "p0 upColor flex" : isDown ? "p0 downColor flex" : "" : "p0 grayColor flex" } > 
                    {   !isNull ? isUp
                            ? <svg  className="updownIcon upColor" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="3 17 9 11 13 15 21 7" /><polyline points="14 7 21 7 21 14" /></svg>
                            : <svg  className=" updownIcon downColor" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="3 7 9 13 13 9 21 17" /><polyline points="21 10 21 17 14 17" /></svg> 
                        : <svg  className="updownIcon grayColor" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /> <line x1="15" y1="16" x2="19" y2="12" /><line x1="15" y1="8" x2="19" y2="12" /></svg>
                    }
                    {  updown }  
                </p>
                
            </div>

            <div> <p className="p5"> { value } </p> </div>

            <div className="d-flex justify-content-between align-items-center" style={{position: 'relative'}}>
                <p className="p1 infclin"> { linkTitle } </p>
                <div className="inforCardIConContainer d-flex justify-content-center align-items-center" > {icon} </div>
            </div>

        </div>
    )
}