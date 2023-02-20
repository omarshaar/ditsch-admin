import React, { useEffect, useState, useContext } from "react";
import './aside.css';
import Logo from '../../../assets/icons/logo.png';
import LogoD from '../../../assets/icons/logoD.png';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import mainContext from "../../../context/main";


export const Aside = () =>{
    const conx = useContext(mainContext);
    const location = useLocation();

    useEffect(() => {
        // handle active aside item ( on route change )
        const element = document.querySelector(`[data-route-name="${location.pathname}"]`);
        handle_asideItems(false, element);
    }, [location]);

    useEffect(()=>{
        // elemnts
        const asidep = document.getElementsByClassName("asidep");
        const asideItemIcon = document.getElementsByClassName("asideItemIcon");
        const menu = document.getElementById("menu");
        const divTitle = document.getElementById("divTitle");
        const adminTit = document.getElementById("adminTit");
        const asideHeader = document.getElementById("asideHeader");
        const mainHeader = document.getElementById("mainHeader");
        const mainContainer = document.getElementById("mainContainer");

        const asideFunc = function(){
            if (window.innerWidth < 1200) {
                for (let i = 0; i < asidep.length; i++) {
                    asidep[i].classList.add("asidepAus");
                }
                for (let i = 0; i < asideItemIcon.length; i++) {
                    asideItemIcon[i].classList.add("asideItemIconAus");
                }
                menu.classList.add("menuAus");
                divTitle.classList.add("divTitleAus");
                adminTit.classList.add("adminTit");
                asideHeader.classList.add("asideHeaderAus");
                mainHeader.classList.add("mainHeaderAus");
                mainContainer.classList.add("mainContainerAus");
            }else{
                for (let i = 0; i < asidep.length; i++) {
                    asidep[i].classList.remove("asidepAus");
                }
                for (let i = 0; i < asideItemIcon.length; i++) {
                    asideItemIcon[i].classList.remove("asideItemIconAus");
                }
                menu.classList.remove("menuAus");
                divTitle.classList.remove("divTitleAus");
                adminTit.classList.remove("adminTit");
                asideHeader.classList.remove("asideHeaderAus");
                mainHeader.classList.remove("mainHeaderAus");
                mainContainer.classList.remove("mainContainerAus");
            }
        }

        window.addEventListener("resize", function(){
            asideFunc();
        });

        if (window.innerWidth < 1200) {
            asideFunc();
        }
    },[]);

    const closeAside = () => {
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
            asidep[i].classList.add("asidepAus");
        }
        for (let i = 0; i < asideItemIcon.length; i++) {
            asideItemIcon[i].classList.add("asideItemIconAus");
        }
        menu.classList.add("menuAus");
        divTitle.classList.add("divTitleAus");
        adminTit.classList.add("adminTit");
        asideHeader.classList.add("asideHeaderAus");
        mainHeader.classList.add("mainHeaderAus");
        mainContainer.classList.add("mainContainerAus");
    }

    const handle_asideItems = (e, element) => {
        window.innerWidth <= 1200 && closeAside();
        // elemnts
        const item = element || e.currentTarget; // if element is passed then use it else use e.currentTarget
        const ID = item.id;
        const asidep = document.querySelectorAll(".asidep");
        const asideItemIcon = document.querySelectorAll(".asideItemIcon");
        // remove active class from all items
        asidep.forEach(elem =>  elem.classList.remove("asideActive") )
        asideItemIcon.forEach(elem =>  elem.classList.remove("asideActive") )
        // add active class to target item
        let items = [
            document.querySelector(`#${ID} .asidep`) ,
            document.querySelector(`#${ID} .asideItemIcon`)
        ];
        items.map( elem =>  elem.classList.toggle("asideActive"));
    }

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
          asidep[i].classList.remove("asidepAus");
        }
        for (let i = 0; i < asideItemIcon.length; i++) {
          asideItemIcon[i].classList.remove("asideItemIconAus");
        }
        menu.classList.remove("menuAus");
        divTitle.classList.remove("divTitleAus");
        adminTit.classList.remove("adminTit");
        asideHeader.classList.remove("asideHeaderAus");
        if (window.innerWidth > 1200) {
          mainHeader.classList.remove("mainHeaderAus");
          mainContainer.classList.remove("mainContainerAus");
        }
    };

    const ordersMenuToggler = (event) => {
        const ordersAsideItems = document.getElementById("ordersAsideItems");
        const angelDownIcon = document.getElementById("angelDownIcon");

        ordersAsideItems.classList.toggle("ordersAsideItemsActive");
        angelDownIcon.classList.toggle("fa-angle-up");

        handle_asideItems(event);
        asideHandler();
    }

    const ordersAsideItems_toggler = (event) => {
        // elemnts
        const element = event.currentTarget;
        const ordersAsideItems = document.querySelectorAll(".ordersAsideItem");
        // remove active class from all items
        ordersAsideItems.forEach(elem =>  elem.classList.remove("ordersAsideItemActive2") );
        // add active class to target item
        element.classList.add("ordersAsideItemsActive2");
    }







    return(
        <aside className="menu" id="menu">

            <div className="asideHeader d-flex align-items-center justify-content-between" id="asideHeader">
                <div className="d-flex align-items-center">
                    {   conx.state.darkMood ?  <img src={Logo} alt="logo" className="logoimg" />  : <img src={LogoD} alt="logo" className="logoimg" /> }
                    <span className="p1" id="adminTit"></span>
                </div>

                <div className="CloseAsideContainer" onClick={closeAside}>
                    <svg width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{stroke: "var(--black)" , cursor: "pointer" }}><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </div>
            </div>

            <div className="aside-body">
                <p className="divTitle" id="divTitle">Menu</p>

                <Link to="/" className="Link">
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="DashboardItem" data-route-name="/">
                    <svg className="asideItemIcon asideActive"  width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><rect x="10" y="12" width="4" height="4" /></svg>
                    <span className="p1 asidep asideActive">Dashboard</span>
                </div>
                </Link>


                <Link to="/transaktion" className="Link">
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="TransaktionItem" data-route-name="/transaktion">
                    <svg className="asideItemIcon" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="3" y="12" width="6" height="8" rx="1" /><rect x="9" y="8" width="6" height="12" rx="1" /><rect x="15" y="4" width="6" height="16" rx="1" /><line x1="4" y1="20" x2="18" y2="20" /></svg>
                    <span className="p1 asidep asideActive">Transaktion</span>
                </div>
                </Link>

                <Link to="/kaffe" className="Link">
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="kaffeItem" data-route-name="/kaffe">
                    <svg  className="asideItemIcon" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" /><path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" /><path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" /><path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" /><path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" /></svg>
                    <span className="p1 asidep asideActive">Kaffe</span>
                </div>
                </Link>

                <Link to="/reinigung" className="Link">
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="reinigungItem" data-route-name="/reinigung">
                    <svg className="asideItemIcon" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="5" y="3" width="14" height="6" rx="2" /><path d="M19 6h1a2 2 0 0 1 2 2a5 5 0 0 1 -5 5l-5 0v2" /><rect x="10" y="15" width="4" height="6" rx="1"></rect></svg>
                    <span className="p1 asidep asideActive">Reinigung</span>
                </div>
                </Link>

                <Link to="/theke" className="Link">
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="thekeItem" data-route-name="/theke">
                    <svg className="asideItemIcon" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 5h8" /><path d="M13 9h5" /><path d="M13 15h8" /><path d="M13 19h5" /><rect x="3" y="4" width="6" height="6" rx="1" /><rect x="3" y="14" width="6" height="6" rx="1" /></svg>
                    <span className="p1 asidep asideActive">Theke</span>
                </div>
                </Link>

                <Link to="/employee" className="Link">
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="employeeItem" data-route-name="/employee">
                    <svg  className="asideItemIcon asideActive"  width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
                    <span className="p1 asidep asideActive"> Mitarbeiter </span>
                </div>
                </Link>

                <Link to="/overtimes" className="Link">
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="overtimesItem" data-route-name="/overtimes">
                    <svg className="asideItemIcon asideActive"  width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="12" cy="13" r="7" /><polyline points="12 10 12 13 14 13" /><line x1="7" y1="4" x2="4.25" y2="6" /><line x1="17" y1="4" x2="19.75" y2="6" /></svg>
                    <span className="p1 asidep asideActive"> Überstunden </span>
                </div>
                </Link>

                <Link to="/page" className="Link">
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="PageItem" data-route-name="/page">
                    <svg  className="asideItemIcon asideActive"  width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="5 12 3 12 12 3 21 12 19 12" /><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" /><rect x="10" y="12" width="4" height="4" /></svg>
                    <span className="p1 asidep asideActive">Page</span>
                </div>
                </Link>

                <Link to="/Calender" className="Link"> 
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="CalenderItem" data-route-name="/Calender">
                    <svg className="asideItemIcon"  width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><rect x="4" y="5" width="16" height="16" rx="2" /> <line x1="16" y1="3" x2="16" y2="7" /><line x1="8" y1="3" x2="8" y2="7" /><line x1="4" y1="11" x2="20" y2="11" /><rect x="8" y="15" width="2" height="2" /></svg>
                    <span className="p1 asidep">Calender</span>
                </div>
                </Link>

                <Link to="/Tasks" className="Link"> 
                <div className="asideItem d-flex align-items-center" onClick={handle_asideItems} id="TasksItem" data-route-name="/Tasks">
                    <svg className="asideItemIcon"  width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.5 5.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 11.5l1.5 1.5l2.5 -2.5" /><path d="M3.5 17.5l1.5 1.5l2.5 -2.5" /><line x1="11" y1="6" x2="20" y2="6" /><line x1="11" y1="12" x2="20" y2="12" /><line x1="11" y1="18" x2="20" y2="18" /></svg>
                    <span className="p1 asidep">Tasks</span>
                </div>
                </Link>

            </div>
        </aside>
    )
}