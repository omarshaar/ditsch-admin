import React, { useEffect } from "react";
import "./DropMenuContainer.css";

export const DropMenuContainer = (props) =>{
    const childern = props.children;
    const buttonID = props.buttonID;
    const containerID = buttonID + "container"
    let opened = false;

    useEffect(()=>{
        let button = document.getElementById(buttonID); 
        button.onclick = function (event) {
            OpenHandler(event);
        }
    },[]);

    const OpenHandler = (event) =>{
        opened = true;
        const Container  = document.getElementById(containerID);
        function outside (e){
            if (!Container.contains(e.target)){
                if (document.getElementById(buttonID).contains(e.target)) {
                    if (opened) {
                        closeContainer();     
                    }
                }
                if (!document.getElementById(buttonID).contains(e.target)) {
                    window.removeEventListener('click', outside);
                    closeContainer();
                }
            }
        }

        function closeContainer() {
            Container.classList.remove("DropMenuContainerActive");
            setTimeout(() => {
                Container.style.display = "none";
                opened = false;
            }, 300);
        }

        setTimeout(() => {
            window.addEventListener('click', outside);
        }, 50);
        
        Container.style.display = "block";
        setTimeout(() => {
            Container.classList.add("DropMenuContainerActive");
        }, 10);

    }

    return (
        <div className="DropMenuContainer" id={containerID}>
            {childern}
        </div>
    )
}