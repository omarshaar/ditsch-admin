import React, { useEffect, useState } from "react";
import "./tasks.css"
import NoTasksIcon from "../../assets/icons/noTasks.svg"
// Components
import { Containery } from "../../components/global/Container/container";
import { TaskViewer } from "./TaskViewer/TaskViewer";
// MUI
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { NewTask } from "../../components/privte/TasksComponents/NewTask/NewTask";
import Skeleton from '@mui/material/Skeleton';
// MUI Date TimePicker
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// API
import { getAllTasksPerStatus } from "../../service/tasksAPI";
import { searchTaskStatus } from "../../service/tasksAPI";
import { updateStatus } from "../../service/tasksAPI";
import { removeTask } from "../../service/tasksAPI";
import { getTags } from "../../service/tasksAPI";






export const Tasks = () => {


    

    const [DateValue, setDateValue] = useState("all");
    const [ data , setData ] = useState();
    const [ date , setDate ] = useState();
    const [ tasksElement, setTasks ] = useState();
    const [open, setOpen] = useState(false);
    const [ undoObj , setundoObj ] = useState({});
    const [ checked , setChecked ] = useState(false);
    const [ SnackbarMassege , setSnackbarMassege ] = useState("");
    let filter = "todo";
    const [ tagsFilter , setTagsFilter ] = useState("all");
    const [ status , setStatus ] = useState("todo");
    const [ beforUnDoData , setBeforUnDoData ] = useState(false);
    const [Tags , setTags ] = useState();
    const [ openDateFilter , setOpenDateFilter ] = useState(false);
    const [ ToUpdateData , setToUpdateData ] = useState(null);
    
    useEffect(()=>{
        const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const current = new Date();
        const date = `${current.getDate()} ${mL[current.getMonth()]} ${current.getFullYear()}`;
        setDate(date);

        getAllTasksPerStatus(status , tagsFilter , "all").then(data => {
            setData(data);
            renderAllTasks(data);
        });

        getTagsData();
        HandleSearchTask();


        setTimeout(() => {
            setOpenDateFilter(false);
        }, 8000);
    },[]);

    useEffect(()=>{
        setOpenDateFilter(false);
    },[DateValue]);


    // Date Formater
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    const dateButtonsHandler = (e) => {
        const datetaskitem = document.querySelectorAll(".datetaskitem");
        for (let i = 0; i < datetaskitem.length; i++) {
            datetaskitem[i].classList.remove("tasksMenuItemActive");
            datetaskitem[i].children[0].classList.remove("IcontasksMenuItemActive");
        }
        e.currentTarget.classList.add("tasksMenuItemActive");
        e.currentTarget.children[0].classList.add("IcontasksMenuItemActive");

    }
    const handleNewTask = () =>{
        const NewTaskContainer = document.getElementById("NewTaskContainer");
        NewTaskContainer.classList.remove("hideElement");
        setToUpdateData(null);
    }

    const undoHandle = function () {
        // Close Snackbar
        SnackbarhandleClose(true);
        // Css Animation 
        MoveAndDeleteTaskElement(undoObj.taskID, true);
        setChecked(false);
        // Change Data
    }
    const SnackbarHandleClick = () => {
        setOpen(true);
    };
    const SnackbarhandleClose = (reason) => {
        /*
        if (reason === 'clickaway') {
          return;
        }
        */
        setOpen(false);
        // If Sankbar Closed And Undo Button not clicked then do this
        if (beforUnDoData.status) {
            if (reason !== true) { 
                sendUpdate_Status(beforUnDoData.taskID, beforUnDoData.status);
            }
        }else{
            if (reason !== true) { 
                // Remove Data API
                removeTask(beforUnDoData.taskID).then();
            }
        }
    };
    const Snackbaraction = (
       <div>
         <Button color="primary" size="small" onClick={undoHandle} >
            UNDO
        </Button>
       </div>
    );

    const headerActionHandler = function(e){
        let filterName;
        const target = e.target;
        const tasksHeaderAction = document.querySelectorAll(".tasksHeaderAction");
        let length = tasksHeaderAction.length;

        // Loding Spinner
        setTasks(<div className="d-flex align-items-center justify-content-center" style={{width: "100%" , height: "95%"}}> <div className="spinner-border" role="status"></div> </div>)

        //  # styles # //
        for (let i = 0; i < length; i++) {
            tasksHeaderAction[i].classList.remove("tasksHeaderActionActive");
        }

        // # Filter Name # //
        if (target.nodeName != "DIV") {
            target.parentElement.classList.add("tasksHeaderActionActive");
            filterName = target.parentElement.getAttribute("data-filtername");
        }else{
            target.classList.add("tasksHeaderActionActive");
            filterName = target.getAttribute("data-filtername");
        }

        filter = filterName;
        setStatus(filterName);
        let date = DateValue != "all" ? formatDate(DateValue) : "all"; 
        getAllTasksPerStatus(filterName , tagsFilter , date).then(data => {
            setData(data);
            renderAllTasks(data);
        });
    }

    const handleComplated = function(taskID) {
        // message
        setSnackbarMassege("Task Complated");
        // Call Undo Snackbar
        SnackbarHandleClick();
        // Moving Style
        MoveAndDeleteTaskElement(taskID);
        // Set Old Data
        setBeforUnDoData({
            "taskID" : taskID , 
            "status" : "complated"
        });
    }
    const handleInProgress = function(taskID) {
        setSnackbarMassege("In Progress");
        // Moving Style
        MoveAndDeleteTaskElement(taskID);
        // Call Undo Snackbar
        SnackbarHandleClick();
        // Change Status Data 

        setBeforUnDoData({
            "taskID" : taskID , 
            "status" : "inProgress"
        });
    }
    const handleDelete = function(taskID) {
        // Call Undo Snackbar
        setSnackbarMassege("Task Deleted");
        SnackbarHandleClick();
        // Moving Style
        MoveAndDeleteTaskElement(taskID);
        // Set Old Data
        setBeforUnDoData({
            "taskID" : taskID
        });
    }

    const MoveAndDeleteTaskElement = (taskID , undo) => {
        let p = document.getElementById(`${taskID}tasklable`);
        let TaskElement = document.getElementById(`taskID${taskID}`);
        TaskElement.style.transition = "0.7s";

        if (undo) {
            // Some Styling
            TaskElement.classList.toggle("taskMoving2");
            setTimeout(() => {
                TaskElement.classList.toggle("taskMoving");
            }, 300);
            setTimeout(() => {
                p.classList.toggle("line-through");
            }, 700);
            setTimeout(() => {
                TaskElement.style.transition = "0s"
            }, 750);

            // Undo List
            setundoObj("");
        }else{
            // Some Styling
            p.classList.toggle("line-through");
            setTimeout(() => {
                TaskElement.classList.toggle("taskMoving");
            }, 0);
            setTimeout(() => {
                TaskElement.classList.toggle("taskMoving2");
            }, 450);
            setTimeout(() => {
                TaskElement.style.transition = "0s"
            }, 750);

            // Undo List
            setundoObj({
                "taskID": taskID,
                "oldStatus": TaskElement.getAttribute("data-tag")
            });
        }
    }

    const renderAllTasks = function(tasksData){
        let complate = false;
        if (filter == "complated") {
            complate = true;
        }

        if (!tasksData.status) {
             // Render Tasks
            let rend = tasksData.map( task => 
                <div className="TaskContainer " key={task.id} id={`taskID${task.id}`} data-tag={task.Tag}>

                    <div className="TaskElementHead d-flex align-items-center" id={`TaskElementHead${task.id}`} >
                        <div className="tasksma" style={{backgroundColor: `${task.Color}`}} id={`tasksma${task.id}`}></div>
                        <div className="d-flex justify-content-between align-items-center" style={{height: "100%" , width: "100%"}}>
                        <div className="d-flex align-items-center" data-task-id={task.id}>
                                <svg className="taskIcon moveIcon" id={`moveIcon${task.id}`} width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="16 4 20 4 20 8" /><line x1="14" y1="10" x2="20" y2="4" /><polyline points="8 20 4 20 4 16" /><line x1="4" y1="20" x2="10" y2="14" /><polyline points="16 20 20 20 20 16" /><line x1="14" y1="14" x2="20" y2="20" /><polyline points="8 4 4 4 4 8" /><line x1="4" y1="4" x2="10" y2="10" /></svg>

                                <svg  className="taskIconBack hideElement" width="23" height="23" onClick={()=>handleCloseTask(task.id)} id={`TaskBackIcon${task.id}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="12" x2="11" y2="18" /><line x1="5" y1="12" x2="11" y2="6" /></svg>
                                
                                { complate ? "" : <div id={"checkBoxContainer"+task.id}> <Tooltip title = "Complated">
                                    <Checkbox sx={{ color: "var(--black)" , '&.Mui-checked': {color: `#${task.Color}`} }} 
                                    onChange={ ()=>{ handleComplated(task.id)} } checked={checked}/></Tooltip></div>
                                }

                                <p className={complate ?  "p2 z8ppp line-through" :  "p2 z8ppp"} id={`${task.id}tasklable`} onClick={()=> handleOpenTsk(task.id)} > {task.TaskTitle} </p>
                        </div>

                        <div className="taskActionsContainer d-flex justify-content-center align-items-center"> 
                                <div className="taskAction" onClick={ ()=> handleInProgress(task.id)}>
                                    { complate ? "" :
                                    <Tooltip title="In Progress">
                                    <svg xmlns="http://www.w3.org/2000/svg"  className="taskActionIcon" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <circle cx="12" cy="12" r=".5" fill="currentColor" />
                                        <circle cx="12" cy="12" r="7" />
                                        <line x1="12" y1="3" x2="12" y2="5" />
                                        <line x1="3" y1="12" x2="5" y2="12" />
                                        <line x1="12" y1="19" x2="12" y2="21" />
                                        <line x1="19" y1="12" x2="21" y2="12" />
                                    </svg></Tooltip> }
                                </div>
                                <div className="taskAction" onClick={()=> HandlEditTaskData(task)}>
                                    <Tooltip title="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="taskActionIcon" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                                        <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                                        <line x1="16" y1="5" x2="19" y2="8" />
                                    </svg>
                                    </Tooltip>
                                </div>
                                <div className="taskAction" onClick={()=> handleDelete(task.id) }>
                                    <Tooltip title="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="taskActionIcon" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                    </Tooltip>
                                </div>
                        </div>
                        </div>
                        
                    </div>

                    <TaskViewer data={task} />
                    
                </div>
            );
            setTasks(rend);
        }else{
            let emptyComponent = <div style={{height: '95%' , width: '100%'}} className="d-flex align-items-center justify-content-center flex-column">
                <img  src={NoTasksIcon} className="NoTasksIcon"/> 
                <div> <p className="p4" style={{marginTop: "25px" , marginLeft: "20px"}}> No tasks available! </p> </div>
            </div>
            setTasks(emptyComponent);
        }
       
    }

    const handleOpenTsk = function(taskID){
        // Elements
        const TaskElement = document.getElementById(`taskID${taskID}`);
        const MoveIcon = document.getElementById(`moveIcon${taskID}`);
        const TaskBackIcon = document.getElementById(`TaskBackIcon${taskID}`);
        const p = document.getElementById(`${taskID}tasklable`);
        const Header = document.getElementById(`TaskElementHead${taskID}`);
        const color = document.getElementById(`tasksma${taskID}`); 
        const TaskBody = document.getElementById(`TaskBody${taskID}`);

        TaskElement.style.transition = "0.5s";
        Header.classList.add("TaskElementHeadAn");
        TaskElement.classList.add("openedTask");
        MoveIcon.classList.add("hideElement");
        TaskBackIcon.classList.remove("hideElement");
        color.classList.add("hideElement");
        p.classList.add("p4");

        setTimeout(() => {
            TaskElement.style.transition = "0s";
        }, 500);
    }

    const handleCloseTask = function(taskID){
        // Elements
        const TaskElement = document.getElementById(`taskID${taskID}`);
        const MoveIcon = document.getElementById(`moveIcon${taskID}`);
        const TaskBackIcon = document.getElementById(`TaskBackIcon${taskID}`);
        const p = document.getElementById(`${taskID}tasklable`);
        const Header = document.getElementById(`TaskElementHead${taskID}`);
        const color = document.getElementById(`tasksma${taskID}`); 
        const TaskBody = document.getElementById(`TaskBody${taskID}`);

        TaskElement.style.transition = "0.5s";
        Header.classList.remove("TaskElementHeadAn");
        TaskElement.classList.remove("openedTask");
        MoveIcon.classList.remove("hideElement");
        TaskBackIcon.classList.add("hideElement");
        color.classList.remove("hideElement");
        p.classList.remove("p4");

        setTimeout(() => {
            TaskElement.style.transition = "0s";
        }, 500);
    }

    const HandleSearchTask = function(){
        const taskSearchInput = document.getElementById("taskSearchInput");
        const key = taskSearchInput.value;
        /*
        taskSearchInput.onkeyup = () =>{
            if (!taskSearchInput.value) {
                getAllTasksPerStatus(status , tagsFilter , dateFilter).then(data => {
                    setData(data);
                    renderAllTasks(data);
                });
            }
        };
        */

        if (key.length > 0) {
            searchTaskStatus(key , status).then((data) => {
                setData(data);
                renderAllTasks(data);
            });
        }
    }

    const sendUpdate_Status = function(taskID , status) {
        updateStatus(taskID , status).then(data => {});
    }

    const getTagsData = function() {
        getTags().then(data => setTags(data) );
    }

    const FilterTag = function(e) {
        const Tasktags = document.querySelectorAll('.Tasktag');
        const currentTarget = e.currentTarget;
        // Get Filter
        const tagName = currentTarget.getAttribute("f-id")
        // Set Filter Name
        setTagsFilter(tagName);

        let date = DateValue != "all" ? formatDate(DateValue) : "all"; 
        // Get Data
        getAllTasksPerStatus(status , currentTarget.getAttribute("f-id") , date).then(data => {
            setData(data);
            // Render
            renderAllTasks(data);
        });

        // Styling
        for (let i = 0; i < Tasktags.length; i++) {
            Tasktags[i].classList.remove("TasktagActive");
        }
        currentTarget.classList.add("TasktagActive");
    }

    const FilteToday = function(e){
        setDateValue(formatDate( new Date()));
        getAllTasksPerStatus(status , tagsFilter , formatDate( new Date())).then(data => {
            setData(data);
            renderAllTasks(data);
        });
        dateButtonsHandler(e);
    }

    const FilterAllDate = function(e){
        setDateValue("all");
        getAllTasksPerStatus(status , tagsFilter , "all").then(data => {
            setData(data);
            renderAllTasks(data);
        });
        dateButtonsHandler(e);
    }

    const FilterDate = (date) =>{
        getAllTasksPerStatus(status , tagsFilter , formatDate(date)).then(data => {
            setData(data);
            renderAllTasks(data);
        });
    }

    const OpenDateFilter = function(e){
        dateButtonsHandler(e);
        setOpenDateFilter(true);
    }

    const closeAlert = function(e){
        const target = e.currentTarget;
        target.classList.add("hideElement");
    }

    const openTaskMenuBar = function(){
        const tasksMenuBarContainer = document.getElementById("tasksMenuBarContainer");
        tasksMenuBarContainer.classList.add("tasksMenuBarContainerActive");
    }
    const CloseTaskMenuBar = function(){
        const tasksMenuBarContainer = document.getElementById("tasksMenuBarContainer");
        tasksMenuBarContainer.classList.remove("tasksMenuBarContainerActive");
    }

    
    const HandlEditTaskData = function(taskData){
        // Open
        handleNewTask();
        setToUpdateData(taskData);
    }


    const onTaskSaveDone = function(){
        getAllTasksPerStatus(status , tagsFilter , "all").then(data => {
            setData(data);
            renderAllTasks(data);
        });
        console.log(status , tagsFilter , date);
    }












    return (
        <Containery>
            <div className="d-flex justify-content-between align-items-center">
                <p className="p2 titleP500">Tasks</p>
                <div className="taskSearchBox d-flex align-items-center">
                    <button className="TaskSearchButton flex items-center justify-center" id="taskSearchButton" onClick={HandleSearchTask}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="taskSearchIcon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </button>

                    <input type="text" placeholder="Search" id="taskSearchInput"/>   
                </div>
            </div>

            <div className="TasksScreen gridContainer">
                
                 {/*Menu*/}
                <div className="tasksMenuBarContainer cardContainer" id="tasksMenuBarContainer">
                    <div onClick={handleNewTask} >
                        <button style={{width: "100%" , marginBottom: "20px"}} className="d-flex justify-content-center align-items-center mainButton">
                            <svg xmlns="http://www.w3.org/2000/svg" className="circlePlusIcon" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                <circle cx="12" cy="12" r="9" />
                                <line x1="9" y1="12" x2="15" y2="12" />
                                <line x1="12" y1="9" x2="12" y2="15" />
                            </svg> 
                            <span>
                                New Task 
                            </span>
                        </button>
                    </div>

                    <div className="tasksMenuItem datetaskitem d-flex align-items-center justify-content-start  tasksMenuItemActive" id="f-date-all"  onClick={FilterAllDate}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="IcontasksMenuItem IcontasksMenuItemActive" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="13" y1="20" x2="20" y2="13" />
                            <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
                        </svg>
                        <p className="p1">All</p>
                    </div>

                    <div className="tasksMenuItem datetaskitem d-flex align-items-center justify-content-start" id="f-date-today" onClick={FilteToday}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="IcontasksMenuItem" width="28" height="28" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M16.3 5h.7a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h5l-2.82 -2.82m0 5.64l2.82 -2.82" transform="rotate(-45 12 12)" />
                        </svg>
                        <p className="p1">Today</p>
                    </div>

                    <div className="tasksMenuItem datetaskitem d-flex align-items-center justify-content-start" onClick={OpenDateFilter}>
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

                        <div className="datePickerFi">
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                            <DatePicker
                                open={openDateFilter}
                                renderInput={(props) => <TextField {...props} />}
                                label=""
                                value={DateValue}
                                onChange={(newValue) => {
                                    setDateValue(newValue);
                                    FilterDate(newValue);
                                }}
                            />
                            </Stack>
                        </LocalizationProvider>
                        </div>
                    </div>


                    <div className="tasksMenuBarActionContainer">
                        <p className="p1 titleP500" style={{marginBottom: "10px"}}>Actions</p>
                            <button className="mainButton" style={{width: "100%"}}>Clear all</button>
                    </div>

                    <div className="tagsContainer">
                        <p className="p1 titleP500" style={{marginBottom: "10px"}} >tags</p>
                        { Tags && 
                            <div className="Tasktag d-flex align-items-center TasktagActive" f-id="all" onClick={FilterTag}>
                                <div className="TasktagBody" style={{backgroundColor: "var(--gray)" , opacity: 0.1}}>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="dottIcon " width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke={"var(--black)"} fill={"var(--black)"} strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <circle cx="12" cy="12" r="4" />
                                </svg>
                                <p className="p0" style={{color: "var(--black)"}}> All </p>
                            </div>
                        }
                        { Tags && 
                            Tags.map(tag => <div key={tag.id} className="Tasktag d-flex align-items-center" f-id={tag.tagName} onClick={FilterTag}>
                            <div className="TasktagBody" style={{backgroundColor: tag.tagColor , opacity: 0.3}}>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="dottIcon" width="20" height="20" viewBox="0 0 24 24" strokeWidth="3" stroke={tag.tagColor} fill={tag.tagColor} strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <circle cx="12" cy="12" r="4" />
                                </svg>
                                <p className="p0" style={{color: tag.tagColor}}>{ tag.tagName }</p>
                            </div>)
                        }
                        { !Tags && <Skeleton variant="rectangular" width={"100%"} height={30} style={{borderRadius: "3px"}} /> }
                    </div>

                </div>
                {/*Menu*/}

                <div className="TasksBody cardContainer">

                    <div className="TasksMenuBarIcon" onClick={openTaskMenuBar}> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <line x1="4" y1="6" x2="20" y2="6" />
                            <line x1="4" y1="12" x2="20" y2="12" />
                            <line x1="4" y1="18" x2="20" y2="18" />
                        </svg>
                    </div>

                    <div className="TasksBodyHead d-flex justify-content-between align-items-center" > 
                        <div className="tasksHeaderActionsContainer d-flex align-items-center" >
                            <div className="tasksHeaderAction tasksHeaderActionActive d-flex justify-content-center align-items-center" data-filtername="todo" onClick={headerActionHandler}>
                                <p className="p0">Todo</p>
                            </div>

                            <div className="tasksHeaderAction d-flex justify-content-center align-items-center" data-filtername="inProgress" onClick={headerActionHandler}>
                                <p className="p0">in Progress</p>
                            </div>

                            <div className="tasksHeaderAction d-flex justify-content-center align-items-center" data-filtername="complated" onClick={headerActionHandler}>
                                <p className="p0">Complated</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center" >
                            <p className="p1-5">Today /</p>  
                            <p className="p1-5 uppercase"> { date } </p>
                        </div>
                    </div> 
                    
                    <NewTask tagsData={Tags} data={ToUpdateData} onTaskSaveDone={ ()=> onTaskSaveDone() } />

                    <div className="tasksContainer" onClick={CloseTaskMenuBar}>
                        {  tasksElement && ( tasksElement ) }
                        {  !tasksElement && ( "No Tasks avilable" ) }
                        <div className="paddingLeer"></div>
                    </div>
                </div>
            </div>


            <div className="alert alert-warning hideElement" role="alert" id="TasksAlertWarning" onClick={closeAlert}></div>
            <div className="alert alert-danger hideElement" role="alert" id="TasksAlertDanger" onClick={closeAlert} ></div>
            <div className="alert alert-success hideElement" role="alert" id="TasksAlertsuccess"  onClick={closeAlert}></div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={SnackbarhandleClose}
                message={SnackbarMassege}
                action={Snackbaraction}
            />

        </Containery>
    );
}