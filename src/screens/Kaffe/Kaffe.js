import { useState, useEffect } from 'react';
import './kaffe.css';
//components
import { Containery } from '../../components/global/Container/container';
import Buttony from '../../components/global/button/Button';
// MUI
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
//
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// api 
import { getSumOfKaffe, updateKaffeSum, getKaffeAllMonth } from '../../service/main';


const Kaffe = () => {
    const [ typeOfView, setTypeOfView ] = useState("sum");



    return (
        <div className="statistics-page">
            <Containery>
                <div className='statistics-header flex items-center justify-between'>
                    <p className="p2 titleP500"> Kaffee Zähler </p>
                    <ButtonGroup variant="contained" className='w-full sm:w-max'>
                        <Button className={ typeOfView == "sum" ? 'stat-button-active' : 'stat-button'} onClick={()=> setTypeOfView('sum')}>Gesamt</Button>
                        <Button className={ typeOfView == "monthly" ? 'stat-button-active' : 'stat-button'}  onClick={()=> setTypeOfView('monthly')}>Monatlisch</Button>
                    </ButtonGroup>
                </div>

                <div className='statistics-body'>
                    <div className='statistics-table-container'>
                        
                        { 
                            typeOfView == "sum" ? <TableContainer /> : <TableContainer2 />
                        }
                    </div>
                </div>
            </Containery>
        </div>
    );
}




const TableContainer = () => {
    const [ data, setData ] = useState(null);

    useEffect(()=>{
        getData();
    },[]);

    function getData() {
        getSumOfKaffe().then(data => setData(data))
    }


    return(
        <div className="TableContainer">
            <div className=''>
                <div className='flex items-center justify-between flex-wrap'> 
                    <p className="p3 titleP500 w-full sm:w-max">Kaffee</p> 
                </div>

                <div className='overflow-y-auto'> 
                    <div className="ode_table">
                        <div className="ode_tableHead"> 
                            <div className="ode_tr d-flex align-items-center justify-content-start">
                            <div className="ode_td flex-grow-1 p2 titleP500"> Title </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Größe </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Menge </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Actions </div>
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            {data && data.map((item, index) => <div key={"hgft"+index} ><TableRow data={item} reGetData={getData} allData={data} setData={setData} /></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const TableRow = (props) => {
    const d = props.data;
    const allData = props.allData;
    const [menge, setMenge] = useState(d.amount);
    const [open, setOpen] = useState(false);

    function updateKaffeAmount() {
        window.confirm("Sicher? ") &&
        allData.forEach(item =>{
            if (item.id == d.id) {
                let verkauft = menge - item.amount;
                item.amount = menge;
                let obj = { 
                    req: "updateKaffeSum",
                    id: item.id, 
                    sum: menge,
                    author: "Admin",
                    verkauft: verkauft
                }
                updateKaffeSum(obj).then(data => data = "successfully" &&  props.setData([...allData]) );
            } 
        });
        setOpen(false);
    }








    return(
        <div className="ode_tr d-flex align-items-center justify-content-start">
            <div className="ode_td flex-grow-1 p1-5"> { d.name } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.size } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.amount } </div>
            <div className="ode_td flex-grow-1 -5"> 
                <Buttony onClick={()=> setOpen(true)} className="w-max px-3 mr-2 bg-orange-600"><i className="fas fa-edit"></i></Buttony> 
            </div>

            <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <div className='upovetcont'>
                        <p className="p3 titleP500 w-full sm:w-max">Überstunden änderen</p> 
                        <div className='mt-5'>
                            <TextField
                                className='w-full'
                                value={menge}
                                label="Minute"
                                type="number"                  
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=> setMenge(e.target.value)}
                            />

                            <Buttony onClick={()=> {updateKaffeAmount()}} className="w-full h-12 mt-4 bg-green-700"> Speicheren </Buttony> 
                        </div>
                    </div>
                </Backdrop>
        </div>
    )
}




const TableContainer2 = () => {
    const [ data, setData ] = useState(null);
    const [ date, setDate ] = useState(new Date());

    useEffect(()=>{
        getData();
    },[date]);

    function getData() {
        getKaffeAllMonth(formatDate(date)).then(data => setData(data))
    }


    // Date Formater
    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month].join("-");
    }


    return(
        <div className="TableContainer">
            <div className=''>
                <div className='flex items-center justify-between flex-wrap'> 
                    <p className="p3 titleP500 w-full sm:w-max">Kaffee</p> 
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

                <div className='overflow-y-auto'> 
                    <div className="ode_table">
                        <div className="ode_tableHead"> 
                            <div className="ode_tr d-flex align-items-center justify-content-start">
                            <div className="ode_td flex-grow-1 p2 titleP500"> Title </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Größe </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Menge </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Letze Änderung </div>
                            </div>
                        </div>
                        <div className={"flex flex-col"}>
                            {data && data.map((item, index) => <div key={"hgft"+index} ><TableRow2 data={item} reGetData={getData} allData={data} setData={setData} /></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const TableRow2 = (props) => {
    const d = props.data;
    const allData = props.allData;
    const [menge, setMenge] = useState(d.amount);
    const [open, setOpen] = useState(false);

    function updateKaffeAmount() {
        window.confirm("Sicher? ") &&
        allData.forEach(item =>{
            if (item.id == d.id) {
                item.amount = menge;
                let obj = { req: "updateKaffeSum", id: item.id, sum: menge }
                updateKaffeSum(obj).then(data => data = "successfully" &&  props.setData([...allData]) );
            }
        });
        setOpen(false);
    }








    return(
        <div className="ode_tr d-flex align-items-center justify-content-start">
            <div className="ode_td flex-grow-1 p1-5"> { d.name } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.size } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.verkauft } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.date } </div>

            <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <div className='upovetcont'>
                        <p className="p3 titleP500 w-full sm:w-max">Überstunden änderen</p> 
                        <div className='mt-5'>
                            <TextField
                                className='w-full'
                                value={menge}
                                label="Minute"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=> setMenge(e.target.value)}
                            />

                            <Buttony onClick={()=> {updateKaffeAmount()}} className="w-full h-12 mt-4 bg-green-700"> Speicheren </Buttony> 
                        </div>
                    </div>
                </Backdrop>
        </div>
    )
}



export default Kaffe;