import React, { useState } from 'react';
import "./Calender.css";
// Components
import { Containery } from "../../components/global/Container/container";
import { CalenderBody } from '../../components/privte/Calender/CalenderBody/CalenderBody';
import { CalenderMenu } from '../../components/privte/Calender/CalenderMenu/CalenderMenu';

export const Calender = () => {
    const [ selectedLayout , setSelectedLayout ] = useState("CalenderMLayaut");

    const MonthWeekDay_Handler = function(e){
        // Elements
        const CalenderMWD = document.getElementsByClassName("CalenderMWD");
        const target = e.target;
        // Styling
        for (let i = 0; i < CalenderMWD.length; i++) {
            CalenderMWD[i].classList.remove("CalenderMWDActive");
        }
        target.classList.add("CalenderMWDActive");

        changeLayout_styling(target);
    }
    const changeLayout_styling = (target) =>{
        const Layouts = document.querySelectorAll(".Layouts");
        Layouts.forEach(layout => {
            layout.classList.add("hideElement");
        });
        const targetID = target.getAttribute("data-layout");
        const targetLayout = document.getElementById(targetID);
        targetLayout.classList.remove("hideElement");
        // set Data
        setSelectedLayout(targetID);
    }

    




    return (
        <div className='ODE-Calender'>
            <Containery>
                <div className='CalenderHeader d-flex justify-content-between align-items-center'> 
                    <p className="p2 titleP500">Calender</p>
                    <div className='CalenderMWDContainer d-flex justify-content-center align-items-center'>
                        <div className='CalenderMWD CalenderMWDActive d-flex align-items-center p1' onClick={MonthWeekDay_Handler} data-layout='CalenderMLayaut'>Month</div>
                        <div className='CalenderMWD d-flex align-items-center p1' onClick={MonthWeekDay_Handler} data-layout='CalenderWLayout'>Week</div>
                        <div className='CalenderMWD d-flex align-items-center p1' onClick={MonthWeekDay_Handler} data-layout='CalenderDLayout'>Day</div>
                    </div>
                </div>
                <div className="Calender-container gridContainer">
                    <CalenderMenu />
                    <CalenderBody 
                        selectedLayout={selectedLayout}
                    />
                </div>
            </Containery>
        </div>
    );
}