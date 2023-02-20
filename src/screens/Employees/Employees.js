import { useState } from 'react';
import './Employees.css';
// components
import { Containery } from "../../components/global/Container/container";
import { useEffect } from 'react';
import Buttony from '../../components/global/button/Button';
// MUI
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
// MUI TimeAdapterDayjs 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// api
import { getEmployees, editEmployee, acceptUser,deletetUser, getEmployeeAuszahlung, getActivitys } from '../../service/main';




const Employees = () => {
    const [ isHeadIcon, setIsHeadIcon ] = useState(false);
    const [ isEdit, setIsEdit ] = useState(false);
    const [ isAuszhalung, setIsAuszhalung ] = useState(false);
    const [ isActivity, setIsActivity ] = useState(false);
    const [ targetUser, setargetUser ] = useState(null);
    const [ addUser, setAddUser ] = useState(false);
    const [ employeesList, setEmployeesList ] = useState(null);
    const [ sortByType, setsortByType ] = useState("mitarbeiter");
    const [ userAuszhalungData, setUserAusZhalungData ] = useState();


    useEffect(()=>{
        getData();
    },[]);

    useEffect(()=>{
        isAuszhalung && getUserAuszhalung(targetUser);
    },[targetUser, isActivity]);

    function OpenEdit(id){
        setIsAuszhalung(false);
        setIsEdit(true);
        setIsHeadIcon(true);
        setAddUser(false);
        setIsActivity(false);
        setargetUser(id);
    }
    function closeEdit() {
        setIsAuszhalung(false);
        setIsEdit(false);
        setIsHeadIcon(false);
        setIsActivity(false);
        setargetUser(null);
    }
    function getData() {
        getEmployees(1).then(handleEmployeesList)
    }
    function handleEmployeesList(data) {
        setEmployeesList(data);
    }

    const handleTypeSort = (type) =>{
        closeEdit();
        setsortByType(type);
        type == "all" ? getEmployees(0).then(handleEmployeesList) : getEmployees(1).then(handleEmployeesList);
    }
 
    function openAsuzhalung(id) {
        setIsAuszhalung(true);
        setIsEdit(false);
        setIsHeadIcon(true);
        setIsActivity(false);
        setargetUser(id);
    }

    function getUserAuszhalung(id) {
        getEmployeeAuszahlung(id).then(data => {
            setUserAusZhalungData(data);
        });
    }

    function switchUser(id) {
        setargetUser(id);
    }

    function openActivity(id) {
        setargetUser(id);
        setIsActivity(true);
        setIsHeadIcon(true);
        setIsAuszhalung(false);
        setIsEdit(false);
    }








    return (
        <div className="employees-page">
            <Containery>
                <div className='flex items-center justify-between flex-wrap'>
                    <p className="p2 titleP500 sm:w-max w-full"> Mitarbeiteren Verwaltung </p>
                    <div className='flex items-center sm:w-max w-full sm:mt-0 mt-3'>
                        <ButtonGroup variant="contained">
                            <Button className={ sortByType=="mitarbeiter" ? 'stat-button-active' : 'stat-button'} onClick={()=> handleTypeSort('mitarbeiter')}>Mitarbeiter</Button>
                            <Button className={ sortByType=="all" ? 'stat-button-active' : 'stat-button'}  onClick={()=> handleTypeSort('all')}>Alle Konten</Button>
                        </ButtonGroup>
                    </div>
                </div>

                <div className={
                        isHeadIcon 
                        ? "employees-cards-body employees-cards-body-head  mt-4 w-full bg-w shadow-sm rounded-md flex items-center overflow-auto employees-cards-transtion"
                        : "employees-cards-body  grid sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 mt-4 gap-3 employees-cards-transtion"
                    }>
                        { employeesList && employeesList.map((d, index) => <div key={'emp'+index}>
                            <EmployeeCard id={d.id} name={d.userName} schicht={d.schicht} std_tag={d.dailyHours} eu_std={d.euro_std} isHeadIcon={isHeadIcon} headActive={targetUser} avatar={d.avatar} OpenEdit={ OpenEdit } openAsuzhalung={openAsuzhalung} openActivity={openActivity} switchUser={switchUser} verified={d.verified} />
                        </div>) }
                </div>

                <div>
                    { isHeadIcon && isEdit && <EmployeeEdit targetUser={employeesList && (employeesList.filter( item => item.id == targetUser ))[0]} closeEdit={closeEdit} addUser={addUser} reGetData={getData} /> }
                    { isHeadIcon && isAuszhalung && <EmployeeAuszhalung closeEdit={closeEdit} userAuszhalungData={userAuszhalungData}  />  }
                    { isHeadIcon && isActivity && <EmployeeActivity closeEdit={closeEdit} targetUser={targetUser}  />  }
                </div>
            </Containery>
        </div>
    );
}

const EmployeeCard = ({id, name, schicht, std_tag, eu_std, isHeadIcon, headActive, avatar, OpenEdit, openAsuzhalung, openActivity, switchUser, verified}) =>{
    return (
        <div className={
            isHeadIcon
            ? "employee-card-container employees-cards-transtion"
            : "employee-card-container w-full employees-cards-transtion"
        }>

            <div className={
                isHeadIcon 
                ? "w-full h-full rounded-md bg-w p-2 flex flex-col items-center employees-cards-transtion"
                : "w-full h-full rounded-md bg-w p-3 py-4 flex flex-col items-center shadow-sm employees-cards-transtion"
            }>

                <div className={
                    isHeadIcon 
                    ? "emp-card-avatar-head overflow-hidden employees-cards-transtion"
                    : "emp-card-avatar overflow-hidden employees-cards-transtion"
                } onClick={()=> switchUser(id)} >
                    <img className={headActive == id && isHeadIcon ? 'w-full h-full object-cover headActiveAvatar' : 'w-full h-full object-cover'} src={ avatar } />
                </div>

               <div className={ isHeadIcon ? 'closedCard' : 'openedCard'}>
                    <div className='emp-card-name mt-4 flex flex-col items-center'>
                        <p className='tP2 flex items-center'><i className="fas fa-user text-xs tP2 mr-2"></i> { name } </p>
                        <p className='p0 opacity-60 mt-2'> { schicht } </p>
                    </div>

                    <div className='flex items-center mt-4'>

                        <div className='flex items-center mr-3'>
                            <div className='empcardiconcont1 mr-1 flex items-center justify-center'><i className="far fa-clock text-white text-sm"></i></div>
                            <p className='p1 font-bold'> { std_tag } <span className='p0'>std/tag</span> </p>
                        </div>
                        <p>|</p>
                        <div className='flex items-center ml-3'>
                            <div className='empcardiconcont2 mr-1 flex items-center justify-center'><i className="far fa-clock text-white text-sm"></i></div>
                            <p className='p1 font-bold'> { eu_std } <span className='p0'>$/std</span> </p>
                        </div>

                    </div>
               </div>


               { !isHeadIcon &&
                <div className='flex mt-4'>
                    <Buttony className="w-max px-3 m-1" onClick={()=> OpenEdit(id)}><i className="fas fa-user-edit"></i></Buttony>
                    { verified != 0 && <Buttony className="w-max px-3 m-1" onClick={()=> openAsuzhalung(id) }><i className="fas fa-money-check-alt"></i></Buttony>}
                    { verified != 0 && <Buttony className="w-max px-3 m-1" onClick={()=> openActivity(id) }><i className="fas fa-user-clock"></i></Buttony>}
                </div>
               }
                

            </div>

        </div>
    )
}

const EmployeeEdit = (props) => {
    const user = props.targetUser;
    const [ schicht, setSchicht ] = useState( user ? user.schicht : 'unbekannt schicht');
    const [ proStd, setProStd ] = useState(user && user.euro_std);
    const [ startTime, setStartTime ] = useState(user && (new Date(`01.01.1998 ${user.workStart}`)).getTime());
    const [ endTime, setEndTime ] = useState( user && (new Date(`01.01.1998 ${user.workEnd}`)).getTime());
    const [ pass, setPass ] = useState('');
    const [ changedData , setChangedData ] = useState({});
    const [ userRools, setUserRools ] = useState();
    const [ rolesChanged, setRolesChanged ] = useState(false);
    const [ dataChanged, setDataChanged ] = useState(null);
    const data = props.employeeData;
    const roolesTitles = {
        "a": "Waren Rechner",
        "b": "Reinigung",
        "c": "Lager",
        "d": "Bruch",
        "e": "Lieferschein",
        "v": "Verkauf",
        "t": "Theke",
        "lk": "Lieferung Kamera"
    }

    useEffect(()=>{
        if(!user) return
        handleUserRooles();
        setSchicht(user.schicht);
        setProStd(user.euro_std);
        setStartTime((new Date(`01.01.1998 ${user.workStart}`)).getTime());
        setEndTime((new Date(`01.01.1998 ${user.workEnd}`)).getTime());
    },[user]);

    useEffect(()=>{
        if (startTime && endTime) {
            const date1 = new Date(startTime);
            const date2 = new Date(endTime);
            const diffInSeconds = (date2.getTime() - date1.getTime()) / 1000;
            const diffInMinutes = diffInSeconds / 60;
            const diffInHours = diffInMinutes / 60;
            setChangedData({...changedData, "dailyHours": afterDot(diffInHours)});
        }
    },[startTime, endTime]);

    useEffect(()=>{
        rolesChanged && setChangedData({...changedData, 'role': userRools.join('-')});
    },[userRools]);


    function afterDot(number) {
        if(!number) return
        let result;
        if (number.toString().split(".")[1]) {

            var firstTwoAfterDot = parseInt(number.toString().split(".")[1].substr(0, 2));
            result = parseFloat(number.toString().split(".")[0] + "." + firstTwoAfterDot);
        }else{
            result = number;
        }
        return result;
    }

    const handleChange = (e, seter, key, newValue) => {
        let time = new Date(newValue);
        let ti = newValue && time.getHours() +':'+ time.getMinutes() + ':00';
        let value = newValue || e.target.value ;
        value && seter(value);

        setChangedData({...changedData, [key]: ti || value});
    }

    const handleUpdateUser = () => {
        window.confirm("Sicher?") &&
        changedData && editEmployee(changedData, user.id).then(data => {
            if(data == 'successfully'){
                setDataChanged(true);
                props.closeEdit();
            }else setDataChanged(false);
        });
    }

    const handleAddUser = () => {

    }
 
    const handleRoolsChange = (e, key) => {

        let roles = [...userRools];
        let index = roles.indexOf(key);

        index >=0 
        ? roles.splice(index , 1)
        : roles.push(key);

        setUserRools([...roles]);
        setRolesChanged(true);
    }

    const isRol = (target) => {
        return userRools ? userRools.includes(target) : false;
    }

    function handleUserRooles() {
        setUserRools(user && (user.role).split('-'));
    }

    function acceptEmployee(id) {
        acceptUser(id).then(data=>{
            if(data == "successfully"){
                props.closeEdit();
                props.reGetData();
            } 
        });
    }

    function deleteEmployee(id) {
        window.confirm('Are you sure you want to delete this employee') &&
        deletetUser(id).then(data=>{
            if(data == "successfully"){
                props.closeEdit();
                props.reGetData();
            } 
        });
    }
    




    return(
        <div className='w-full mt-2 h-max cardContainer p-4' >
            <div className='mb-4 flex items-center justify-between'>
                <svg onClick={props.closeEdit} className="taskIconBack" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="12" x2="11" y2="18" /><line x1="5" y1="12" x2="11" y2="6" /></svg>
                <div className='p-1 px-3 adduserbtn cursor-pointer' onClick={()=> deleteEmployee(user.id)}><i className="fas fa-trash text-white p0"> </i></div> 
            </div>
            { user && user.verified == "0" && <div className='p-1 px-3 adduserbtn cursor-pointer mb-3 text-center py-2' onClick={()=>acceptEmployee(user.id)}><i className="fas fa-user-check text-white"></i> <span className='text-white text-sm ml-3'> Mitarbeiter akzeptieren</span> </div>}
            
            <div className='EmployeeEdit-header flex items-center justify-between'>
                <div className='flex items-center'>
                    <div className='EmployeeEdit-avatar-container relative cursor-pointer'>
                        <img src={ user && user.avatar } className='w-full h-full object-cover' />
                        <div className='image-edit-icon flex items-center justify-center absolute right-1 bottom-1'> <i className="fas fa-sync text-xs"></i> </div>
                    </div>

                    <p className='tP1 md:text-2xl text-xl ml-5 ed-userName cursor-pointer flex items-center'>  { user && user.userName || "User Name" } <span className='ml-2'> { props.addUser && <i className="fas fa-user-edit text-xs"></i> } </span> </p>
                </div>
            </div>

            {/* Rollren Section */}
            <div className='w-full mt-10'>
                <p className='tP1 sm:text-lg'> <i className="fas fa-user-tag mr-2"></i> Mitarbeiter Rollen</p>

                <div className='rollen-container mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:md:grid-cols-5'>
                    {Object.keys(roolesTitles).map((key, index) => 
                        <div className='userRoleCard d-flex items-center' key={'jhgfff'+index}>
                            <Checkbox checked={isRol(key)} size='small' id={'rolekey'+index} onChange={(e)=> handleRoolsChange(e, key, index)} />
                            <label htmlFor={'rolekey'+index}><p className='tP1'>{ roolesTitles[key] }</p></label>
                        </div>
                    )}
                </div>

            </div>

            {/* Arbeit Zeiten Section */}
            <div className='w-full mt-10'>
                <p className='tP1 sm:text-lg'> <i className="fas fa-user-clock mr-2"></i> Arbeitzeiten </p>
                
                <div className='mt-4'>
                    <p className='tP2 mb-1 '>Schicht:</p>

                    <Select
                        id="schicht-select" value={schicht} label=" " onChange={(e)=>handleChange(e, setSchicht, 'schicht')} className={'sm:w-80 w-full input-mui'}>
                        <MenuItem defaultChecked value={"unbekannt schicht"}>unbekannt schicht</MenuItem>
                        <MenuItem value={"Nacht Schicht"}>Nacht Schicht</MenuItem>
                        <MenuItem value={"Tages Schicht"}>Tages Schicht</MenuItem>
                        <MenuItem value={"Reinigung Schicht"}>Reinigung Schicht</MenuItem>
                    </Select>
                </div>


                <div className='d-flex items-center flex-wrap'>
                    <div className='mt-4'>
                        <p className='tP2 mb-1 '>von:</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker value={startTime} ampm={false}  onChange={(newValue, e)=> handleChange(e, setStartTime, 'workStart', newValue)} label= '.' renderInput={(params) => <TextField className={'sm:w-40 w-full input-mui'} {...params} />}/>
                        </LocalizationProvider>
                    </div>

                    <div className='mt-4 ml-1'>
                        <p className='tP2 mb-1 '>bis:</p>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <TimePicker value={endTime} ampm={false} onChange={(newValue, e)=> handleChange(e, setEndTime, 'workEnd', newValue)} label= '.' renderInput={(params) => <TextField className={'sm:w-40 w-full input-mui'} {...params} />}/>
                        </LocalizationProvider>
                    </div>
                </div>

                <div className='mt-4'>
                    <p className='tP2 mb-1 '>Pro Stunde:</p>
                    <TextField className={'sm:w-80 w-full input-mui'} type="number" label=" " value={proStd} onChange={(e)=> handleChange(e, setProStd, 'euro_std')} />
                </div>

                { props.addUser &&
                <div className='mt-4'>
                    <p className='tP2 mb-1 '>Passwort:</p>
                    <TextField className={'sm:w-80 w-full input-mui'} type="text" label=" " value={pass} onChange={(e)=> handleChange(e, setPass, 'password')} />
                </div>
                }

                <div className='mt-14'>
                    <Button variant="contained" disabled={Object.keys(changedData) >= 0} className='w-full h-14 btnmui' onClick={() => props.addUser ? handleAddUser() : handleUpdateUser() }>Speichern</Button>
                </div>
            </div>

        </div>
    )
}

const EmployeeAuszhalung = (props) => {


    return(
        <div className='w-full mt-2 h-max cardContainer p-4' >
            <div className='mb-4 flex items-center justify-between'>
                <svg onClick={props.closeEdit} className="taskIconBack" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="12" x2="11" y2="18" /><line x1="5" y1="12" x2="11" y2="6" /></svg>
            </div>

            <div className=''>
                <TableContainer data={props.userAuszhalungData} />
            </div>
        </div>
    )
}

const TableContainer = (props) => {

    return(
        <div className="TableContainer">

            <div className='flex items-center justify-between'> 
                <p className="p3 titleP500">Auszhalungen</p> 
            </div>

            <div className='overflow-y-auto'> 
                <div className="ode_table ode_table2">

                    <div className="ode_tableHead">
                        <div className="ode_tr d-flex align-items-center justify-content-start">
                          <div className="ode_td flex-grow-1 p2 titleP500"> Datum </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Stunden </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Pro Stunde </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Auszhalung </div>
                        </div>
                    </div>

                    <div className="ode_tableBody flex flex-col-reverse ">
                        { props.data && props.data.map( (item,index) =>  <div key={"sdsa+"+index}><TableRow data={item} /></div> )}
                    </div>
                    
                </div>
            </div>

        </div>
    );
}

const TableRow = (props) => {
    const d = props.data;

    function afterDot(number) {
        if(!number) return
        let result;
        if (number.toString().split(".")[1]) {

            var firstTwoAfterDot = parseInt(number.toString().split(".")[1].substr(0, 2));
            result = parseFloat(number.toString().split(".")[0] + "." + firstTwoAfterDot);
        }else{
            result = number;
        }
        return result;
    }

    function handleHours(number) {
        if(!number) return

        let uhrs = Math.floor(number);
        let minute = Math.round((number - uhrs) * 60)

        return `${uhrs},${minute}`;
    }
    
    return(
        <div className="ode_tr d-flex align-items-center justify-content-start">
            <div className="ode_td flex-grow-1 p1-5 titleP500"> { d.year +"-"+ d.month } </div>
            <div className="ode_td flex-grow-1 p1-5"> { handleHours(d.total + d.overTime) } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.euro } </div>
            <div className="ode_td flex-grow-1 p1-5"> { afterDot(d.euro * (d.total + d.overTime)) } </div>
        </div>
    )
}

const EmployeeActivity = (props) => {
    const [ activitysData, setActivitysData ] = useState();
    const [ date, setDate ] = useState(new Date());

    useEffect(()=>{
        getActivity(props.targetUser, date);
    },[date, props.targetUser]);

    useEffect(()=>{
        console.log(activitysData);
    },[activitysData]);

    function getActivity(id, date) {
        getActivitys(id, formatDate(date)).then(data => setActivitysData(data));
    }

    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }

    return (
        <div className='w-full mt-2 h-max cardContainer p-4' >
            <div className='mb-4 flex items-center justify-between'>
                <svg onClick={props.closeEdit} className="taskIconBack" width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="12" x2="11" y2="18" /><line x1="5" y1="12" x2="11" y2="6" /></svg>
                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Basic example"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <TableActivity data={activitysData} />
        </div>
    )
}

const TableActivity = (props) => {
    return(
        <div className="TableContainer">

            <div className='flex items-center justify-between'> 
                <p className="p3 titleP500">Aktivitäten</p> 
            </div>

            <div className='overflow-y-auto'> 
                <div className="ode_table ode_table2">

                    <div className="ode_tableHead">
                        <div className="ode_tr d-flex align-items-center justify-content-start">
                          <div className="ode_td flex-grow-1 p2 titleP500"> Datum </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Time </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> status </div>
                        </div>
                    </div>

                    <div className="ode_tableBody flex flex-col ">
                        { props.data && props.data.map( (item,index) =>  <div key={"sdsa+"+index}><ActivityRow data={item} /></div> )}
                    </div>
                    
                </div>
            </div>

        </div>
    );
}

const ActivityRow = (props) => {
    const d = props.data;
    const activitysComponents = [
        <div className="p1 status badgeSoftDanger">Offline</div>,
        <div className="p1 status badgeSoftSuccess">Online</div>
    ];

    return(
        <div className="ode_tr d-flex align-items-center justify-content-start">
            <div className="ode_td flex-grow-1 p1-5 titleP500"> { d.date } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.time } </div>
            <div className="ode_td flex-grow-1 p1-5"> { activitysComponents[d.online] } </div>
        </div>
    )
}

export default Employees;