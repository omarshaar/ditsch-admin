import React, { useEffect, useState } from "react";
import "./CalenderBody.css";
import Button from "../../../global/button/Button";

export const CalenderBody = (props) => {

    /***/ let date = new Date();
    /***/ const selectedLayout = props.selectedLayout;
    /*_*/ const [ selectedDate , setSelectedDate ] = useState(new Date());
    /***/ let month = selectedDate.getMonth() + 1;
    /***/ let year = selectedDate.getFullYear();
    /***/ let day = selectedDate.getDay();
    /***/ let Today_Date = selectedDate.getMonth() == date.getMonth() && selectedDate.getFullYear() == date.getFullYear() ?  date.getDate() : false;

    useEffect(()=>{
        setSelectedDate(date);
        //selectedDate == date ? 
    },[selectedLayout]);

    useEffect(()=>{
        if (selectedLayout == "CalenderMLayaut") MonthRechnungs(selectedDate);
        if (selectedLayout == "CalenderWLayout") WeekRechnungs(selectedDate);
        if (selectedLayout == "CalenderDLayout") DayRechnungs(selectedDate);
    },[selectedDate , selectedLayout]);
    useEffect(()=>{
        createWeekGridBoxs();
        createDayGridBoxs();
    },[]);



    const reset = () => {
        console.log(selectedDate.getDate());
        console.log(selectedDate.getMonth()+1);
        console.log(selectedDate.getDay()+1);
        console.log('====================================');
    }

    // Calculations for each Layout and then call Create Function
    /* Month */ const MonthRechnungs = function (the_date) {
        // To get The First Day of the Current Month
        if (Today_Date) the_date = new Date(`${year}-${month}-01`);
        const AllBoxs_inMonthLayout = 42;
        const current_Date = date.getDate();
        let MonthStartOnWeekDay = getSelectedtMonthData(the_date).currentDay_inWeek;
        if (MonthStartOnWeekDay == 0) { MonthStartOnWeekDay = 7; }
        const AllDaysFromCurrentMonth = getSelectedtMonthData(the_date).daysInCurrentMonth;
        const AllDaysFromLastMonth = getSelectedtMonthData(the_date).daysInLastMonth;
        const LastMonthStartOn = (AllDaysFromLastMonth - (MonthStartOnWeekDay - 2));
        const LastMonthEndOn = AllDaysFromLastMonth;
        const AllDaysToNextMonth = (AllBoxs_inMonthLayout - AllDaysFromCurrentMonth - MonthStartOnWeekDay);
        const If_All_Boxs_exist_toRender = (AllDaysToNextMonth + AllDaysFromCurrentMonth + MonthStartOnWeekDay) == AllBoxs_inMonthLayout ? true : false;

        // Call Create Functions relative to the Layout
        createMonthGridBoxs(AllDaysFromCurrentMonth , AllDaysToNextMonth , LastMonthStartOn , LastMonthEndOn);
        setHeader_Date_Data(getSelectedtMonthData(the_date).current_MonthName , year)
    }
    /* Week */ const WeekRechnungs = function (the_date){
        let WeekDay = date.getDay() == 0 ? 7 : date.getDay();
        let WasDay = false;
        if (the_date.getDay() != WeekDay) {
            WasDay = true;
            WeekDay = the_date.getDay(); 
        }else{
            WasDay = false;
        }

        console.log(WeekDay);

        let dateFrom = new Date(the_date);
        let dateTo = new Date(the_date);
        if (Today_Date || WasDay) {
            dateFrom.setDate(the_date.getDate() - (WeekDay - 1));
            let restDays = 7 - WeekDay; 
            dateTo.setDate(the_date.getDate() + restDays);
        }else{
            dateTo.setDate(the_date.getDate() + 6);
        }

        const From_MonthName = getSelectedtMonthData(dateFrom).current_MonthName;
        const To_MonthName = getSelectedtMonthData(dateTo).current_MonthName;
        let Week_Month_Name = From_MonthName == To_MonthName ? From_MonthName : `${From_MonthName}-${To_MonthName}`;

        const From_Year = getSelectedtMonthData(dateFrom).currentYear;
        const To_Year = getSelectedtMonthData(dateTo).currentYear;
        let Week_Year = From_Year == To_Year ? From_Year : `${From_Year}-${To_Year}`;

        var getDaysArray = function(start, end) {
            for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
                arr.push(new Date(dt));
            }
            return arr; 
        }
        createWeekHeader(getDaysArray(dateFrom, dateTo));
        setHeader_Date_Data(Week_Month_Name, Week_Year);
    }
    /* Day */ const DayRechnungs = function (the_date) {
        const isToday = the_date.getMonth() == date.getMonth() && the_date.getFullYear() == date.getFullYear() && the_date.getDate() == date.getDate();
        createDayHeader(the_date.getDate() , the_date.getDay(), isToday);
        setHeader_Date_Data(getSelectedtMonthData(the_date).current_MonthName, the_date.getFullYear());
    }


    // Create Functions For all Layouts
    /* Month */ const createMonthGridBoxs = (AllDaysFromCurrentMonth, AllDaysToNextMonth, LastMonthStartOn, LastMonthEndOn) => {

        // Elements
        const container = document.getElementById("MonthLayout");
        container.innerHTML = "";
        for (let i = LastMonthStartOn; i <= LastMonthEndOn; i++) {
            container.innerHTML += `<div class='CalenderBox'>
            <div class='CalenderBoxDNInactive'>${i}</div>
            </div>`;
        }
        for (let i = 1; i <= AllDaysFromCurrentMonth; i++) {
            if (i == Today_Date) {
                container.innerHTML += `<div class='CalenderBox CalenderBoxActive'>
                <div class='CalenderBoxDNActive'>${i}</div>
                </div>`;
            }else{
                container.innerHTML += `<div class='CalenderBox'>
                <div class='CalenderBoxDNActive'>${i}</div>
                </div>`;
            }
        }
        for (let i = 1; i <= AllDaysToNextMonth + 1; i++) {
            container.innerHTML += `<div class='CalenderBox'>
            <div class='CalenderBoxDNInactive'>${i}</div>
            </div>`;
        }
    }
    /* Week */ const createWeekGridBoxs = () => {
        const container = document.getElementById("WeekLayout");
        container.innerHTML = "";
        for (let i = 0; i < 168; i++) {
            container.innerHTML += 
            `<div class='CalenderBox'>
                <div class='CalenderWeekBox'>
                    <div></div>
                    <div></div>
                </div>
            </div>`;
        }

        function Create_Hours_Containers() {
            const container = document.getElementById("CalenderLayout_H");
            container.innerHTML = "";
            for (let i = 0; i <= 23; i++) {
                let Hour = i < 10 ? `0${i}` : i;
                container.innerHTML += 
                `<div class="HoursContainer d-flex justify-content-center p0-1">${Hour}:00</div>`;
            }
        }
        Create_Hours_Containers();
    }
    const createWeekHeader = (days) => {
        const Container = document.querySelector("#CalenderW_LayoutHeader");
        const dayName = [ "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat" , "Sun"];
        // Chack if date matches today's date
        let isToday , index;

        for (let i = 0; i < days.length; i++) {
            isToday = date.getMonth() == days[i].getMonth() && date.getFullYear() == days[i].getFullYear() && date.getDate() == days[i].getDate();
            index = i;
            if (isToday) break;
        }

        // Create
        Container.innerHTML = `<div class="CalenderLayoutDays d-flex justify-content-center align-items-center weekH">H</div>`;
        for ( let i = 0; i < dayName.length ; i++){
            isToday && index == i ? Container.innerHTML +=  `<div class="CalenderLayoutDays d-flex justify-content-center align-items-center wlMN"><div><p class="p1 titleP500">${dayName[i]}</p><p class="p0 ">${days[i].getDate()}</p></div></div>` :
            Container.innerHTML +=  `<div class="CalenderLayoutDays d-flex justify-content-center align-items-center"><div><p class="p1 titleP500">${dayName[i]}</p><p class="p0 ">${days[i].getDate()}</p></div></div>`;
        }
    }
    /* Day */ const createDayHeader = (date , day , isToday) => {
        const dayName = ["Sun" , "Mon" , "Tue" , "Wed" , "Thu" , "Fri" , "Sat"];
        const container = document.getElementById("CalenderDLayoutsHeader");
        if (isToday) {
            container.innerHTML = 
            `<div class="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> ${dayName[day]} </div>
            <div class="p1 dayLMNActive titleP500 d-flex justify-content-center align-items-center"> ${date} </div>`
        }else{
            container.innerHTML = 
            `<div class="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> ${dayName[day]} </div>
            <div class="p1 dayLMN titleP500 d-flex justify-content-center align-items-center"> ${date} </div>`
        }

    }
    const createDayGridBoxs = () => {
        const container = document.getElementById("DayLayout");
        container.innerHTML = "";
        for (let i = 0; i <= 24; i++) {
            container.innerHTML += 
            `<div class='CalenderBox'>
                <div class='CalenderWeekBox'>
                    <div></div>
                    <div></div>
                </div>
            </div>`;
        }

        function Create_Hours_Containers() {
            const container = document.getElementById("CalenderLayout_H_D");
            container.innerHTML = "";
            for (let i = 0; i <= 23; i++) {
                let Hour = i < 10 ? `0${i}` : i;
                container.innerHTML += 
                `<div class="HoursContainer d-flex justify-content-center p0-1">${Hour}:00</div>`;
            }
        }
        Create_Hours_Containers();
    }


    // Get Date Data Functions
    const getNummberOfDaysOfSelectedMonth = function(year, month) {
        return new Date(year, month, 0).getDate();
    }
    const getSelectedtMonthData = function (date) {
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const currentYear = date.getFullYear();
        const MonthIndex = date.getMonth();
        const current_MonthName = months[MonthIndex];
        const currentDay_inMonth = date.getDate();
        const currentDay_inWeek = date.getDay();
        const daysInCurrentMonth = getNummberOfDaysOfSelectedMonth(currentYear, (MonthIndex + 1));
        const daysInLastMonth = getNummberOfDaysOfSelectedMonth(currentYear, MonthIndex);

        return {
            "date":  date,
            "currentYear": currentYear, 
            "current_MonthName": current_MonthName,
            "currentDay_inMonth": currentDay_inMonth, 
            "currentDay_inWeek": currentDay_inWeek, 
            "daysInCurrentMonth": daysInCurrentMonth, 
            "daysInLastMonth": daysInLastMonth
        };
    }


    // Body Head Functions
    /* set Next */ const setNextDate = function(){
        if (selectedLayout == "CalenderMLayaut") {
            month >= 12 ? SetNextYear() : month++;
            function SetNextYear() {
                month = 1;
                year = year + 1;
            }
            setSelectedDate(new Date(`${year}-${month}-01`));
        }
        if (selectedLayout == "CalenderWLayout") {
            let nextWeek = new Date(selectedDate);
            nextWeek.setDate(selectedDate.getDate() + 7);
            setSelectedDate(nextWeek);
        }
        if (selectedLayout == "CalenderDLayout") {
            let nextDay = new Date(selectedDate);
            nextDay.setDate(selectedDate.getDate() + 1);
            setSelectedDate(nextDay);
        }
        
    }
    /* set Prev */ const setPrevDate = function(){
        if (selectedLayout == "CalenderMLayaut") {
            month <= 1 ? SetPrevYear() : month--;
            function SetPrevYear() {
                month = 12;
                year = year - 1;
            }
            setSelectedDate(new Date(`${year}-${month}-01`));
        }
        if (selectedLayout == "CalenderWLayout") {
            let nextWeek = new Date(selectedDate);
            nextWeek.setDate(selectedDate.getDate() - 7);
            setSelectedDate(nextWeek);
        }
        if (selectedLayout == "CalenderDLayout") {
            let prevDay = new Date(selectedDate);
            prevDay.setDate(selectedDate.getDate() - 1);
            setSelectedDate(prevDay);
        }
       
    }
    /* get Today */ const goToday = function(){
        setSelectedDate(new Date());
    }
    /* show Date */ const setHeader_Date_Data = function (month , year){
        const headerMonthName = document.getElementById("headerMonthName");
        const headerYearName = document.getElementById("headerYearName");
        // show in the Body Head the current or selected Date
        headerMonthName.innerHTML = month;
        headerYearName.innerHTML = year;
    }









    return (
        <div className="CalenderBody">
            <div className="CalenderHeaderOfBody d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center justify-content-between">
                    <div className="nextPrevButtons d-flex align-items-center justify-content-between">
                        <button className="nextPrevButton" id="PrevButton" onClick={setPrevDate}> {"<"} </button>
                        <button className="nextPrevButton" id="NextButton" onClick={setNextDate}> {">"} </button>
                    </div>
                    <div onClick={goToday}><Button style={{ marginLeft: "20px" }}>Today</Button></div>
                </div>
                <div className="d-flex align-items-center">
                    <p className="p2 titleP500" id="headerMonthName" style={{marginRight: "7px"}}> Month </p> 
                    <p className="p2 titleP500" id="headerYearName"> Year </p>
                </div>
            </div>

            <div className="CalenderLayoutsBody">

                {/* Month Layout */}
                <div className="Layouts CalenderMLayout" id="CalenderMLayaut">
                    <div className="CalenderLayoutsHeader gridContainer">
                        <div className="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> Mon </div>
                        <div className="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> Tue </div>
                        <div className="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> Wed </div>
                        <div className="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> Thu </div>
                        <div className="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> Fri </div>
                        <div className="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> Sat </div>
                        <div className="CalenderLayoutDays d-flex justify-content-center align-items-center p1 titleP500"> Sun </div>
                    </div>

                    <div className="MonthLayout gridContainer" id="MonthLayout">

                    </div>
                </div>

                {/* Week Layout */}
                <div className="Layouts CalenderWLayout hideElement" id="CalenderWLayout">
                    <div className="CalenderWLayoutHeader gridContainer" id="CalenderW_LayoutHeader">
                        
                    </div>

                    <div className="CalenderWeekMainContainer scrolledLayout d-flex justify-content-center align-items-start">
                        <div className="CalenderLayout_H gridContainer" id="CalenderLayout_H"></div>
                        <div className="WeekLayout gridContainer" id="WeekLayout"></div>
                    </div>
                </div>
                
                {/* Day Layout */}
                <div className="Layouts CalenderWLayout hideElement" id="CalenderDLayout">
                    <div className="CalenderDLayoutsHeader d-flex justify-content-center align-items-center" id="CalenderDLayoutsHeader">
                        
                    </div>

                    <div className="CalenderWeekMainContainer scrolledLayout d-flex justify-content-center align-items-start">
                        <div className="CalenderLayout_H gridContainer" id="CalenderLayout_H_D"></div>
                        <div className="DayLayout gridContainer" id="DayLayout"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}