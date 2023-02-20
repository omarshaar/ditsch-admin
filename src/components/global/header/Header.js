import React from "react";
import "./Header.css";
import { DrawerOpenHandler } from "../Drawer/Drawer";
import { DropMenuContainer } from "../dropMenuContainer/DropMenuContainer";
import mainContext from "../../../context/main";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const MainHeader = () => {
  const conx = useContext(mainContext);
  const [ darkMood , setDarkMood ] = useState(false); 
  
  const asideHandler = () => {

    // elemnts
    const asidep = document.getElementsByClassName("asidep");
    const asideItemIcon = document.getElementsByClassName("asideItemIcon");
    const menu = document.getElementById("menu");
    const divTitle = document.getElementById("divTitle");
    const adminTit = document.getElementById("adminTit");
    const asideHeader = document.getElementById("asideHeader");
    const mainHeader = document.getElementById("mainHeader");
    const mainContainer = document.getElementById("mainContainer");
  
    for (let i = 0; i < asidep.length; i++) {
      asidep[i].classList.toggle("asidepAus");
    }
    for (let i = 0; i < asideItemIcon.length; i++) {
      asideItemIcon[i].classList.toggle("asideItemIconAus");
    }
    menu.classList.toggle("menuAus");
    divTitle.classList.toggle("divTitleAus");
    adminTit.classList.toggle("adminTit");
    asideHeader.classList.toggle("asideHeaderAus");
    if (window.innerWidth > 1200) {
      mainHeader.classList.toggle("mainHeaderAus");
      mainContainer.classList.toggle("mainContainerAus");
    }



    // for drop item
    const ordersAsideItems = document.getElementById("ordersAsideItems");
    const angelDownIcon = document.getElementById("angelDownIcon");
    ordersAsideItems.classList.remove("ordersAsideItemsActive");
    angelDownIcon.classList.remove("fa-angle-up");
    angelDownIcon.style.display = "none";
  };

  const darkMoodHandler = () => {
    conx.handleDarkMod();
  };


  return (
    <header className="mainHeader d-flex justify-content-between align-items-center" id="mainHeader">
      
      <div className="menuButton">
        <i className="fa-solid fa-bars menuIcon" onClick={asideHandler}></i>
      </div>
      <nav className="d-flex align-items-center">
        <div className="navItem d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={darkMoodHandler}
            className="NavIcon"
            width="84"
            height="84"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
          </svg>
        </div>

        <div className="navItem  d-flex align-items-center">
          <svg
            id="AppsButton"
            xmlns="http://www.w3.org/2000/svg"
            className="NavIcon"
            width="84"
            height="84"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <rect x="4" y="4" width="6" height="6" rx="1" />
            <rect x="4" y="14" width="6" height="6" rx="1" />
            <rect x="14" y="14" width="6" height="6" rx="1" />
            <line x1="14" y1="7" x2="20" y2="7" />
            <line x1="17" y1="4" x2="17" y2="10" />
          </svg>
          <DropMenuContainer buttonID="AppsButton">
            <h5>Apps</h5>
          </DropMenuContainer>
        </div>

        <div className="navItem  d-flex align-items-center">
          <div style={{ position: "relative" }} id="notiButton">
            <div className="notiCont d-flex justify-content-center align-items-center">
              3
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="NavIcon"
              width="84"
              height="84"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
              <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
            </svg>
          </div>

          <DropMenuContainer buttonID="notiButton">
            <h5>Notifications</h5>
          </DropMenuContainer>
        </div>

        <div
          className="navItem  d-flex align-items-center"
          onClick={DrawerOpenHandler}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="NavIcon"
            width="84"
            height="84"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        {/* <div className="profileContainer navItem d-flex align-items-center">
          <div className="profileImageContainer">
            <img
              src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80"
              alt="profile"
            />
          </div>
          <div>
            <span className="p1">Omar s..</span>
            <i className="fa-solid fa-angle-down FontIcon"></i>
          </div>
        </div> */}
        
      </nav>
    </header>
  );
};
