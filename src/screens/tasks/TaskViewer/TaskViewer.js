import React, { useEffect } from "react";
import "./TaskViewer.css";
import { Containery } from "../../../components/global/Container/container";




export const TaskViewer = (props) => {
    const data = props.data;
    useEffect(() =>{
        const text = document.getElementById(`taskTxt${data.id}`);
        text.innerHTML = data.TaskText;
    },[data]);

    return (
        <Containery>
            <div className="TaskViewerHead d-flex justify-content-between align-items-center">
                <p className="p0"> Created Date: { data.CreateDate } </p>
                <p className="p0"> Completion Time: { data.Date } </p>
            </div>
            <div className="TaskViewerBody">
                <p className="p2" id={`taskTxt${data.id}`}>  </p>
            </div>
            <div className="TaskViewerTagsContainer">
                <p className="p1">Tag:</p>
                <div className="d-flex align-items-center" style={{marginTop: "15px"}}>
                
                <svg xmlns="http://www.w3.org/2000/svg" className="tagIcon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="8.5" cy="8.5" r="1" fill="currentColor" />
                    <path d="M4 7v3.859c0 .537 .213 1.052 .593 1.432l8.116 8.116a2.025 2.025 0 0 0 2.864 0l4.834 -4.834a2.025 2.025 0 0 0 0 -2.864l-8.117 -8.116a2.025 2.025 0 0 0 -1.431 -.593h-3.859a3 3 0 0 0 -3 3z" />
                </svg>
                <p className="p1 tagsP"> { data.Tag } </p>
                </div>
            </div>
        </Containery>
    );
}