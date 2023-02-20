import { useState, useEffect } from 'react';
import './OverTimes.css';
//components
import { Containery } from '../../components/global/Container/container';
import Buttony from '../../components/global/button/Button';
// MUI
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
// api 
import { getEmployeesOverTimes, removeOverTime, acceptOverTime} from '../../service/main';


const OverTimes = () => {
    return (
        <div className="statistics-page">
            <Containery>
                <div className='statistics-header flex items-center justify-between'>
                    <p className="p2 titleP500"> Überstunden </p>
                    <div className='p-1 px-3 adduserbtn cursor-pointer'><i className="fas fa-plus text-white p0"></i></div>
                </div>

                <div className='statistics-body'>
                    <div className='statistics-table-container'> <TableContainer /> </div>
                </div>
            </Containery>
        </div>
    );
}




const TableContainer = () => {
    const [ data, setData ] = useState(null);
    const [ sortUp, setSortUp ] = useState(true);

    useEffect(()=>{
        getData();
    },[]);

    function getData() {
        getEmployeesOverTimes().then(data => setData(data))
    }


    return(
        <div className="TableContainer">
            <div className=''>
                <div className='flex items-center justify-between flex-wrap'> 
                    <p className="p3 titleP500 w-full sm:w-max">Mitarbeiter Überstunden</p> 
                </div>

                <div className='overflow-y-auto'> 
                    <div className="ode_table">
                        <div className="ode_tableHead"> 
                            <div className="ode_tr d-flex align-items-center justify-content-start">
                            <div className="ode_td flex-grow-1 p2 titleP500"> Datum </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Mitarbeiter </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Überstunden </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Actions </div>
                            </div>
                        </div>
                        <div className={ sortUp ? "flex flex-col" : "flex flex-col-reverse" }>
                            {data && data.map((item, index) => <div key={"hgft"+index} ><TableRow data={item} reGetData={getData} /></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


const TableRow = (props) => {
    const d = props.data;
    const [overTime, setOverTime] = useState((d.overTime) * 60);
    const [overTimeInput, setOverTimeInput] = useState((d.overTime) * 60);
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
      setOpen(!open);
    };

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

    function accept(d) {
        let obj = {
            req: "acceptOverTime",
            workTimesID: d.workTimesID,
            overTimesID: d.id,
            overTime: overTime / 60
        }
        acceptOverTime(obj).then(data => data == "successfully" && props.reGetData());
    }

    function remove(d) {
        let obj = {
            req: "removeOverTime",
            overTimesID: d.id
        }
        removeOverTime(obj).then(data => data == "successfully" && props.reGetData());
    }

    function updateOverTime() {
        setOpen(true);
    }

    return(
        <div className="ode_tr d-flex align-items-center justify-content-start">
            <div className="ode_td flex-grow-1 p1-5"> { d.date } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.userName } </div>
            <div className="ode_td flex-grow-1 p1-5"> { afterDot(overTime) } <span className='text-xs'>min</span> </div>
            <div className="ode_td flex-grow-1 -5"> 
                <Buttony onClick={()=> accept(d)} className="w-max px-3 mr-2 bg-green-600"><i className="fas fa-check"></i></Buttony> 
                <Buttony onClick={()=> updateOverTime(d)} className="w-max px-3 mr-2 bg-orange-600"><i className="fas fa-edit"></i></Buttony> 
                <Buttony onClick={()=> remove(d)} className="w-max px-3"><i className="fas fa-ban"></i></Buttony> 
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
                                value={overTimeInput}
                                label="Minute"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=> setOverTimeInput(e.target.value)}
                            />

                            <Buttony onClick={()=> {setOverTime(overTimeInput); setOpen(false)}} className="w-full h-12 mt-4 bg-green-700"> Speicheren </Buttony> 
                        </div>
                    </div>
                </Backdrop>
        </div>
    )
}








export default OverTimes;