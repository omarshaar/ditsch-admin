import React, { createContext, useEffect, useState } from 'react';
// api
import { getAllArticle } from '../service/main';

const mainContext = createContext();


export const MainProvider = ({children}) => {
    const [state , setState] = useState({
        darkMood: null,
        callBack: '',
        warenData: null
    });
    useEffect(()=>{
        getWare();
    },[]);


    //////////////////////// Start Dark Mod
    function handleDarkMod(){
        setState({...state, darkMood: !state.darkMood});
        !state.darkMood ? document.documentElement.classList.add("darkMood") : document.documentElement.classList.remove("darkMood"); 
    }
    function setDarkMod() {
        state.darkMood != null && localStorage.setItem("dark", JSON.stringify(state.darkMood));
    }
    useEffect(()=>{
        setDarkMod();
    },[state]);
    //////////////////////// End Dark Mod

    function getWare() {
        getAllArticle().then(data => setState({...state, warenData: data}));
    }
    











    return (
        <mainContext.Provider value={{state: state , handleDarkMod}}>
            { children }
        </mainContext.Provider>
    );
}


export default mainContext;