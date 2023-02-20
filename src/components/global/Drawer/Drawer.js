import React from "react";
import "./Drawer.css";


export const DrawerOpenHandler = () =>{
    const DrawerContainer = document.getElementById("DrawerContainer");
    const DrawerBackdrop = document.getElementById("DrawerBackdrop");
    const DrawerBody = document.getElementById("DrawerBody");

    DrawerContainer.classList.add("DrawerContainerActive");
    setTimeout(() => {
        DrawerBackdrop.classList.add("DrawerBackdropActive");
        DrawerBody.style.right = "0px";
        setTimeout(() => {
            DrawerBody.style.width = "400px";
        }, 300);
    }, 10);
    document.body.style.overflow = "hidden";
}
export const DrawerCloseHandler = () =>{
    const DrawerBackdrop = document.getElementById("DrawerBackdrop");
    const DrawerBody = document.getElementById("DrawerBody");
    const DrawerContainer = document.getElementById("DrawerContainer");

    DrawerBody.style.width = "450px";
    setTimeout(() => {
        DrawerBackdrop.classList.remove("DrawerBackdropActive");
        DrawerBody.style.right = "-450px";
        setTimeout(() => {
            DrawerContainer.classList.remove("DrawerContainerActive");
        }, 200);
    }, 250);
    document.body.style.overflow = "auto";
}


export const Drawer = () =>{
    return(
        <div className="DrawerContainer" id="DrawerContainer">
            <div className="DrawerBackdrop" id="DrawerBackdrop" onClick={DrawerCloseHandler}></div>
            <div className="DrawerBody" id="DrawerBody">
               <p className="p5">Setting</p>
            </div>
        </div>
    )
}