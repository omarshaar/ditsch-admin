import axios from "axios";

const ApiHostUrl = "http://cmsapi.oderasid.com";


export const getAllTasksPerStatus = async (status , tag , date) =>{
    const Respo = await axios.get( `${ApiHostUrl}?getAllTasksPerStatus=${status}&tag=${tag}&dateFilter=${date}` );
    return Respo.data;
}


export const updateStatus = async (taskID , status) =>{
    const Respo = await axios.get( `${ApiHostUrl}?taskID=${taskID}&status=${status}&updateStatus=1` );
    return Respo.data;
}


export const searchTaskStatus = async (key , status) =>{
    const Respo = await axios.get(`${ApiHostUrl}?status=${status}&searchTask=1&key=${key}`);
    return Respo.data;
}


export const removeTask = async (taskID) =>{
    const Respo = await axios.get(`${ApiHostUrl}?removeTask=1&id=${taskID}`);
}


export const getTags = async () =>{
    const Respo = await axios.get(`${ApiHostUrl}?getTags=1`);
    return Respo.data;
}


export const addNewTask = async (taskTitle, TaskText, Date, Status, Tag, Color , Time) =>{
    const Respo = await axios.get(`${ApiHostUrl}?addNewTask=1&taskTitle=${taskTitle}&TaskText=${TaskText}&Date=${Date}&Status=${Status}&Tag=${Tag}&Color=${Color}&Time=${Time}`);
    return Respo.data;
}



export const updateTaskData = async (taskTitle, TaskText, Date, Status, Tag, Color , Time, taskID) =>{
    const Respo = await axios.get(`${ApiHostUrl}?UpdateTaskData=1&taskTitle=${taskTitle}&TaskText=${TaskText}&Date=${Date}&Status=${Status}&Tag=${Tag}&Color=${Color}&Time=${Time}&TaskID=${taskID}`);
    return Respo.data;
}