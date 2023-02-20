import React, { useEffect, useState } from "react";
import "./MenuBar.css";
import Button from "../../../global/button/Button";
// MUI
import Skeleton from '@mui/material/Skeleton';



export const MenuBar = (props) => {
    const tagsData = props.tagsData;
    const test = props.test;
    const [ tagsElements , setTagsElements ] = useState("");

    useEffect(() => {
        renderTags();
    },[tagsData]);


    const handleNewTask = () =>{
        const NewTaskContainer = document.getElementById("NewTaskContainer");
        NewTaskContainer.classList.remove("hideElement");
    }

    const renderTags = () => {
        if (tagsData) {
            const rend = tagsData.map(tag => <div key={tag.id} className="Tasktag d-flex align-items-center" f-id={tag.tagName} onClick={test}>
                <div className="TasktagBody" style={{backgroundColor: tag.tagColor , opacity: 0.3}}>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="dottIcon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke={tag.tagColor} fill={tag.tagColor} strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="12" r="4" />
                </svg>
                <p className="p0" style={{color: tag.tagColor}}>{ tag.tagName }</p>
            </div>);
            setTagsElements(rend);
        } 
    }

    const dateButtonsHandler = (e) => {
        const datetaskitem = document.getElementsByClassName("datetaskitem");
        for (let i = 0; i < datetaskitem.length; i++) {
            datetaskitem[i].classList.remove("tasksMenuItemActive");
            datetaskitem[i].children[0].classList.remove("IcontasksMenuItemActive");
        }
        e.currentTarget.classList.add("tasksMenuItemActive");
        e.currentTarget.children[0].classList.add("IcontasksMenuItemActive");

    }


    return (
        <div className="tasksMenuBarContainer cardContainer" >
            <div onClick={handleNewTask} >
                <Button style={{width: "100%" , marginBottom: "20px"}} className="d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="circlePlusIcon" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <circle cx="12" cy="12" r="9" />
                        <line x1="9" y1="12" x2="15" y2="12" />
                        <line x1="12" y1="9" x2="12" y2="15" />
                    </svg> 
                    <span>
                        New Task 
                    </span>
                </Button>
            </div>

            <div className="tasksMenuItem datetaskitem d-flex align-items-center justify-content-start  tasksMenuItemActive" id="f-date-all"  onClick={dateButtonsHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" className="IcontasksMenuItem IcontasksMenuItemActive" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <line x1="13" y1="20" x2="20" y2="13" />
                    <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
                </svg>
                <p className="p1">All</p>
            </div>

            <div className="tasksMenuItem datetaskitem d-flex align-items-center justify-content-start" id="f-date-today" onClick={dateButtonsHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" className="IcontasksMenuItem" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M16.3 5h.7a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h5l-2.82 -2.82m0 5.64l2.82 -2.82" transform="rotate(-45 12 12)" />
                </svg>
                <p className="p1">Today</p>
            </div>

            <div className="tasksMenuItem datetaskitem d-flex align-items-center justify-content-start" onClick={dateButtonsHandler}>
                <svg xmlns="http://www.w3.org/2000/svg" className="IcontasksMenuItem" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="4" y="5" width="16" height="16" rx="2" />
                    <line x1="16" y1="3" x2="16" y2="7" />
                    <line x1="8" y1="3" x2="8" y2="7" />
                    <line x1="4" y1="11" x2="20" y2="11" />
                    <line x1="11" y1="15" x2="12" y2="15" />
                    <line x1="12" y1="15" x2="12" y2="18" />
                </svg>
                <p className="p1">Date</p>
            </div>

            <div className="tagsContainer">
                <p className="p1 titleP500" style={{marginBottom: "10px"}} >tags</p>
                { tagsElements && 
                    <div className="Tasktag d-flex align-items-center TasktagActive" f-id="all">
                        <div className="TasktagBody" style={{backgroundColor: "var(--gray)" , opacity: 0.1}}>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="dottIcon " width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke={"var(--black)"} fill={"var(--black)"} strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="12" cy="12" r="4" />
                        </svg>
                        <p className="p0" style={{color: "var(--black)"}}> All </p>
                    </div>
                }
                { tagsElements && tagsElements}
                { !tagsElements && <Skeleton variant="rectangular" width={"100%"} height={30} style={{borderRadius: "3px"}} /> }
            </div>

            <div className="tasksMenuBarActionContainer">
                <p className="p1 titleP500" style={{marginBottom: "10px"}}>Actions</p>
                
            </div>

        </div>
    );
}