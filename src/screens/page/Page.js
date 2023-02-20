import React, { useEffect, useState } from 'react';
import './Page.css';


const Page = () => {

    useEffect(()=>{setTimeout(postMeassage,500)},[]);

    function postMeassage() {
        const MessageObject = { "messageName": "admin" }
        let iframe = document.getElementById("page");
        iframe.contentWindow.postMessage("admin", "*");
    }
    

    return (
        <div className="PageMainContainer" >
            <iframe src={"http://localhost:3001/"} className='pageframe' id='page' onLoad={postMeassage} />
        </div>
    );
}

export default Page;

// "https://ditsch.oderasid.com" 