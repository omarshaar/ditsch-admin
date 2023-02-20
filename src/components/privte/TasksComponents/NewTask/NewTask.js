import React, { useState, useRef, useMemo, useEffect } from "react";
import "./NewTask.css";
import Button from "../../../global/button/Button";
// MUI Date TimePicker
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// Editor
import { Editor } from "@tinymce/tinymce-react";
// APIs
import { addNewTask } from "../../../../service/tasksAPI";
import { updateTaskData } from "../../../../service/tasksAPI";




export const NewTask = (props) => {
    const editorRef = useRef(null);
    const tagsData = props.tagsData;
    const taskData = props.data;
    const [StartdateTimeValue, setStartDateTimeValue] = useState(null);
    const [selectedTag, setSelectedTag] = useState([]);
    const [dataUploaded, setDataUploaded] = useState(false);
    const [EditorInitialValue, setEditorInitialValue] = useState("");
    const [TitleValue, setTitleValue] = useState("");
    let editorPreviewed = false;

    useEffect(() => {
        if (taskData) {

            const title = document.getElementById("newTaskTitleInput");
            const Statusselect = document.getElementById("Statusselect");
            const tag = document.querySelector(`[data-value=${taskData.Tag}]`);

            title.value = taskData.TaskTitle;
            setEditorInitialValue(taskData.TaskText);
            Statusselect.value = taskData.Status;
            // Tag
            setSelectedTag({
                name: taskData.Tag,
                color: taskData.Color
            });
            const newTaskTag = document.getElementsByClassName("newTaskTag");
            for (let i = 0; i < newTaskTag.length; i++) {
                newTaskTag[i].classList.remove("newTaskTagActive");
            }
            tag.classList.add("newTaskTagActive");
            setStartDateTimeValue(`${taskData.Date} ${taskData.Time}`);

        } else {
            const title = document.getElementById("newTaskTitleInput");
            const Statusselect = document.getElementById("Statusselect");

            title.value = "";
            setEditorInitialValue("");
            Statusselect.value = "todo";
            setStartDateTimeValue(null);
        }

    }, [taskData]);

    // Date Formater
    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    const previewHandl = () => {
        const EditorE = document.getElementById("EditorE");
        const editorPreviewContainer = document.getElementById(
            "editorPreviewContainer"
        );
        if (editorRef.current) {
            editorPreviewContainer.innerHTML = editorRef.current.getContent();
        }
        if (editorPreviewed) {
            editorPreviewed = false;
            editorPreviewContainer.innerHTML = "";
        } else {
            editorPreviewed = true;
        }
        EditorE.classList.toggle("hideElement");
    };

    const CloseNewTask = () => {
        const NewTaskContainer = document.getElementById("NewTaskContainer");
        NewTaskContainer.classList.add("hideElement");
    };

    const TagsHandler = (e) => {
        const newTaskTag = document.getElementsByClassName("newTaskTag");
        const target = e.currentTarget;
        // Styling
        for (let i = 0; i < newTaskTag.length; i++) {
            newTaskTag[i].classList.remove("newTaskTagActive");
        }
        target.classList.add("newTaskTagActive");

        setSelectedTag({
            name: target.getAttribute("data-value"),
            color: target.getAttribute("data-color"),
        });
    };

    const SaveTaskHandle = () => {
        // Inputs
        const TitleInput = document.getElementById("newTaskTitleInput");
        const Statusselect = document.getElementById("Statusselect");

        const taskTitle = TitleInput.value;
        const TaskText = editorRef.current.getContent();
        const Date = formatDate(StartdateTimeValue);
        const Status = Statusselect.value;
        const Tag = selectedTag.name;
        const Color = selectedTag.color && selectedTag.color.substring(1, selectedTag.color.length);
        const Time = StartdateTimeValue && StartdateTimeValue.toLocaleTimeString();
        if (
            taskTitle.length > 0 &&
            TaskText &&
            Date &&
            Status &&
            Tag &&
            Color &&
            Time
        ) {
            setDataUploaded(true);

            if (!taskData) {
                addNewTask(taskTitle, TaskText, Date, Status, Tag, Color, Time).then(
                    (data) => {
                        if (data.status == "ok") {
                            const TasksAlertsuccess = document.getElementById("TasksAlertsuccess");
                            setTimeout(() => {
                                TasksAlertsuccess.classList.remove("hideElement");
                                TasksAlertsuccess.innerHTML = "Save Success";
                                setTimeout(() => {
                                    TasksAlertsuccess.classList.add("hideElement");
                                }, 5000);
                                setDataUploaded(false);
                            }, 800);
                        } else {
                            setDataUploaded(false);
                            const TasksAlertDanger =
                                document.getElementById("TasksAlertDanger");
                            TasksAlertDanger.classList.remove("hideElement");
                            TasksAlertDanger.innerHTML = "There was an error while saving the task. Please try again later.";
                            setTimeout(() => {
                                TasksAlertDanger.classList.add("hideElement");
                            }, 5000);
                        }
                    }
                );
            } else {
                updateTaskData(taskTitle, TaskText, Date, Status, Tag, Color, Time, taskData.id).then((data) => {
                    if (data.status == "ok") {
                        const TasksAlertsuccess = document.getElementById("TasksAlertsuccess");
                        setTimeout(() => {
                            TasksAlertsuccess.classList.remove("hideElement");
                            TasksAlertsuccess.innerHTML = "Update Success";
                            setTimeout(() => {
                                TasksAlertsuccess.classList.add("hideElement");
                            }, 5000);
                            setDataUploaded(false);
                        }, 800);
                    } else {
                        setDataUploaded(false);
                        const TasksAlertDanger =
                            document.getElementById("TasksAlertDanger");
                        TasksAlertDanger.classList.remove("hideElement");
                        TasksAlertDanger.innerHTML = "There was an error while saving the task. Please try again later.";
                        setTimeout(() => {
                            TasksAlertDanger.classList.add("hideElement");
                        }, 5000);
                    }
                });
            }


        } else {
            const TasksAlertWarning = document.getElementById("TasksAlertWarning");
            TasksAlertWarning.classList.remove("hideElement");
            TasksAlertWarning.innerHTML = "Please fill all fields";
            setTimeout(() => {
                TasksAlertWarning.classList.add("hideElement");
            }, 5000);
        }

        props.onTaskSaveDone();
    }




    return (
        <div className="NewTaskContainer hideElement" id="NewTaskContainer">
            <div style={{ padding: "25px", paddingBottom: "0px" }}>
                <svg className="taskIconBack" width={23} height={23} onClick={CloseNewTask} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"    > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="12" x2="11" y2="18" /><line x1="5" y1="12" x2="11" y2="6" /> </svg>
                <p className="p2 titleP500" style={{ marginTop: "15px" }}>Task Title </p>
            </div>
            <div className="NewTaskHeader">
                <input
                    type="text"
                    className="NewTaskInput"
                    id="newTaskTitleInput"
                    placeholder="Type here..."
                />
            </div>
            <div className="taskInhalt">
                <p className="p2 titleP500" style={{ marginBottom: "20px" }}> Task Details </p>
                <div id="EditorE">
                    <Editor
                        onInit={(evt, editor) => (editorRef.current = editor)}
                        initialValue={EditorInitialValue}
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: [
                                "advlist autolink lists link image charmap print preview anchor",
                                "searchreplace visualblocks code fullscreen",
                                "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                                "undo redo | formatselect | " +
                                "bold italic backcolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style:"body { font-family: Poppins, sans-serif; font-size:14px}",
                        }}
                    />
                </div>

                <div id="editorPreviewContainer"> </div>
                
                <div onClick={previewHandl} style={{ marginTop: "15px", position: "absolute", bottom: "20px", left: "24px"}}>
                    <Button>preview</Button>
                </div>
            </div>
            <div className="NewTaskTagsContainer">
                <p className="p2 titleP500" style={{ marginBottom: "20px" }}> Tag </p>
                <div className="d-flex justify-content-start align-items-center">
                    <div className="newTaskTag newTaskTagActive" onClick={TagsHandler} data-value="empty" data-color="#000">
                        <p className="p0" style={{ position: "relative", zIndex: 2, color: "var(--black)" }}> {" "} No Tag </p>
                        <div style={{backgroundColor: "var(--gray)", position: "absolute", left: 0, top: 0, height: "100%", width: "100%", zIndex: 0, opacity: 0.1,}}></div>
                    </div>

                    {tagsData 
                            ? tagsData.map((tag) => (
                            <div className="newTaskTag" key={tag.id} onClick={TagsHandler} data-value={tag.tagName} data-color={tag.tagColor}>
                                <p className="p0" style={{position: "relative", zIndex: 2, color: tag.tagColor}}>{" "}{tag.tagName} </p>
                                <div style={{ backgroundColor: tag.tagColor, position: "absolute", left: 0, top: 0, height: "100%", width: "100%", zIndex: 0, opacity: 0.3,}}></div>
                            </div>)) 
                    : ""}

                    <Button style={{ width: "40px" }}> + </Button>
                </div>
            </div>

            <div className="NewTaskTagsContainer">
                <p className="p2 titleP500" style={{ marginBottom: "20px" }}>Status</p>
                <div className="d-flex justify-content-start align-items-center">
                    <select className="Statusselect" id="Statusselect">
                        <option value="todo">Todo</option>
                        <option value="inProgress">in Progress</option>
                        <option value="complated">Complated</option>
                    </select>
                </div>
            </div>

            <div className="NewTaskTagsContainer">
                <p className="p2 titleP500" style={{ marginBottom: "20px" }}>
                    Date & Time
                </p>

                <div className="d-flex justify-content-start align-items-center" style={{ marginBottom: "20px" }}>
                    <div style={{ zIndex: 10000 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}> <DateTimePicker renderInput={(props) => <TextField {...props} />} label="Date & Time" value={StartdateTimeValue} onChange={(newValue) => { setStartDateTimeValue(newValue);}} /> </Stack>
                        </LocalizationProvider>
                    </div>
                </div>
            </div>

            <div className="NewTaskTagsContainer">
                <div onClick={SaveTaskHandle}>
                    <Button style={{ width: "100%", height: "56px", fontSize: "15px" }}>
                        {dataUploaded ? (<div className="spinner-border spinnerSave" role="status">{" "} </div> ) : (taskData ? "Update this task" : "Create new task")}
                    </Button>
                </div>
            </div>
        </div>
    );
};
