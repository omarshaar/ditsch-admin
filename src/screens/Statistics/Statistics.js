import { useState, useContext } from 'react';
import './Statistics.css';
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
import { getLastTransactions } from '../../service/dashbord';
import { useEffect } from 'react';
import { UpdateTransActionItems, deleteTransactoinRow } from '../../service/main';
// context
import mainContext from '../../context/main';

const Statistics = () => {

    return (
        <div className="statistics-page">
            <Containery>
                <div className='statistics-header flex items-center justify-between'>
                    <p className="p2 titleP500"> Transaktion </p>
                </div>

                <div className='statistics-body'>

                    <div className='statistics-table-container'> <TableContainer /> </div>
                </div>
            </Containery>
        </div>
    );
}



const TableContainer = () => {
    const [ allData, setAllData ] = useState(null);
    const [ transData, setTransData ] = useState(null);
    const [limit, setLimit] = useState(100);
    const [ sortByType, setSortByType ] = useState(null);
    const [ sortUp, setSortUp ] = useState(true);
    const [ showDetails, setShowDetails ] = useState(false);

    const tagsComponents = {
        "bruch" : <div className="p1 status badgeSoftDanger">Bruch</div>,
        "verkauf" : <div className="p1 status badgeSoftSuccess">Verkauf</div>,
        "liefer" : <div className="p1 status badgeSoftWarning">Lieferschein</div>
    }

    useEffect(()=>{
        getData();
    },[]);

    useEffect(()=>{
        setTransData(allData);
    },[allData]);

    useEffect(()=>{
        handleTypeFilter(sortByType);
    },[sortByType]);

    function getData(){
        getLastTransactions(limit).then(handleTransData);
    }

    function handleTransData(data) {
        const all = [];

        // spreed
        Object.keys(data).map(key => {
          data[key].map(item => {
            if(item.artikelsObj == "null") return;
            item.component = tagsComponents[key];
            item.type = key;
            item.sum = 0;
            JSON.parse(item.artikelsObj).map(i => item.sum += parseInt(i.amount))
            all.push(item);
          });
        });
    
        // sort array
        all.sort((a, b) => {
          let dateA = new Date(a.date), dateB = new Date(b.date); 
          return dateA - dateB;
        });
    
        // resort
        all.reverse();
    
        // set data
        setAllData(all);
    }

    function handleTypeSort(type){
        if(type == sortByType) {setSortByType(''); return}
        setSortByType(type);
    }
    
    function handleTypeFilter(sortByType) {
        if (sortByType) setTransData(allData.filter( item => item.type == sortByType ))
        else setTransData(allData);
    }
    


    return(
        <div className="TableContainer">
            { showDetails 
            ? <ViewDetails closeDetails={()=> setShowDetails(false)} showDetails={showDetails} reFetchData={getData} />
            :
            <div className=''>
                <div className='flex items-center justify-between flex-wrap'> 
                    <p className="p3 titleP500 w-full sm:w-max">Letzte Transaktion</p> 
                    <ActionHeader handleTypeSort={handleTypeSort} sortByType={sortByType} setSortUp={setSortUp} sortUp={sortUp} />
                </div>

                <div className='overflow-y-auto'> 
                    <div className="ode_table">
                        <div className="ode_tableHead"> 
                            <div className="ode_tr d-flex align-items-center justify-content-start">
                            <div className="ode_td flex-grow-1 p2 titleP500"> Datum </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Mitarbeiter </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Transaktion </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> ID </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> Total </div>
                            <div className="ode_td flex-grow-1 p2 titleP500"> View Details </div>
                            </div>
                        </div>
                        <div className={ sortUp ? "flex flex-col" : "flex flex-col-reverse" }>
                            { transData && transData.map((item, index) => <div key={'tra'+index}><TableRow HandleShowDetails={(obj) => setShowDetails(obj)}  data={item} /></div>) }
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

const TableRow = (props) => {
    const d = props.data;

    return(
        <div className="ode_tr d-flex align-items-center justify-content-start">
            <div className="ode_td flex-grow-1 p1-5"> { d.date } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.targetUserName } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.component } </div>
            <div className="ode_td flex-grow-1 p1-5 titleP500"> #{ d.id } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.sum } </div>
            <div className="ode_td flex-grow-1 -5"> <Buttony onClick={()=> props.HandleShowDetails(d)} >View Details</Buttony> </div>
        </div>
    )
}




const ActionHeader = (props) => {
    const [age, setAge] = useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };


    return(
        <div className='flex items-center w-full sm:w-max sm:mt-0 mt-2'>
            <ButtonGroup variant="contained" className='w-full sm:w-max'>
                <Button className={ props.sortByType=="verkauf" ? 'stat-button-active' : 'stat-button'} onClick={()=> props.handleTypeSort('verkauf')}>Verkauf</Button>
                <Button className={ props.sortByType=="bruch" ? 'stat-button-active' : 'stat-button'}  onClick={()=> props.handleTypeSort('bruch')}>Bruch</Button>
                <Button className={ props.sortByType=="liefer" ? 'stat-button-active' : 'stat-button'}  onClick={()=> props.handleTypeSort('liefer')}>Lieferschein</Button>
            </ButtonGroup>

            <Button className='stat-filter-btn sm:!ml-2 ' variant="contained" onClick={()=> props.setSortUp(()=> !props.sortUp) }><i className={props.sortUp ? "fas fa-sort-amount-up-alt" : "fas fa-sort-amount-down-alt"} ></i></Button>
            {/* <div className='relative !ml-2 overflow-hidden'>
                <Button className='stat-filter-btn' variant="contained"><i className="far fa-calendar-alt"></i></Button>
                <Select className='stat-filter-btn selectDate'  value={age} label="." onChange={handleChange}>
                    <MenuItem value={0}>Diesem Monat</MenuItem>
                    <MenuItem value={2}>Letze Monat</MenuItem>
                    <MenuItem value={6}>Letze 6 Monate</MenuItem>
                    <MenuItem value={12}>Letze 12 Monate</MenuItem>
                </Select>
            </div> */}
        </div>
    )
}


const ViewDetails = (props) => {
    const d = props.showDetails;
    const [ articels, setArticels ] = useState(JSON.parse(d.artikelsObj));
    const [ openAddRow, setOpenAddRow ] = useState(false);
    const [ Menge, setMenge ] = useState(0);
    const [ WareItem, setWareItem ] = useState("");
    const [open, setOpen] = useState(false);
    const [ newValue, setNewValue ] = useState("");
    let amount = 0;
    const conx = useContext(mainContext);

    const randomID = () => {
        return Math.floor(Math.random() * 1000100000010009) + 1;
    }


    const handleDelete = (category, id) => {
        window.confirm("sicher?") && 
        articels.map((articel) => {
            if(articel.id == id){
                let copy = [...articels];
                articels.splice(articel, 1);
                UpdateTransActionItems(category, d.id, articel.amount, articels, articel.number).then(data =>{ 
                    data == 'successfully'
                    ? setArticels([...articels])
                    : setArticels([...copy])
                });
            }
        });
    }

    const handleUpdate = (category, id) => {
        setOpen(false);
        window.confirm("sicher?") && 
        articels.map((articel) => {
            if(articel.id == id){
                let copy = [...articels];
                let amountToDataBase = parseInt(articel.amount) - newValue;
                articel.amount = newValue;

                UpdateTransActionItems(category, d.id, amountToDataBase, articels, articel.number).then(data =>{ 
                    data == 'successfully'
                    ? setArticels([...articels])
                    : setArticels([...copy])
                });
            }
        })
    }

    const handleOpenUpdate = (id) =>{
        articels.map((articel) => {
            if(articel.id == id){
                setOpen(true);
                setNewValue(articel.amount);
            }
        });
    }

    const DeleteActionRow = () => {
        window.confirm('Are you sure you want to delete?')
        &&
        deleteTransactoinRow(d.type, d.id, JSON.stringify(JSON.parse(d.artikelsObj)), (JSON.parse(d.artikelsObj)).length).then(data => {
            console.log(data);
            if(data == 'successfully'){
                props.reFetchData();
                props.closeDetails();
            }
        });
    }

    const handleAddRow = () => {
        let copy = [...articels];
        let obj = {
            id: randomID(),
            number: WareItem.number,
            amount: Menge,
            title: WareItem.title,
            unit: "Einzeln"
        }

        Menge > 0 && WareItem && articels.push(obj);
        Menge > 0 && WareItem && window.confirm("sicher?") && 
        UpdateTransActionItems(d.type, d.id, (0 - Menge), articels, WareItem.number).then(data =>{ 
            console.log(data);
            if (data == 'successfully') {
                setArticels([...articels]);
            }else{ setArticels([...copy]) }
        });

        
        setOpenAddRow(false);
    }



    return (
        <div className='w-full'>
            <div className='details-rows-container w-full'>

                <div className='overflow-y-auto'>
                    <div className='w-full flex justify-between items-center'>
                        <div className='flex items-center'>
                            <svg className="taskIconBack" width={23} height={23} onClick={props.closeDetails} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round"    > <path stroke="none" d="M0 0h24v24H0z" fill="none" /> <line x1="5" y1="12" x2="19" y2="12" /><line x1="5" y1="12" x2="11" y2="18" /><line x1="5" y1="12" x2="11" y2="6" /> </svg>
                            { d.component } 
                            <div className='ml-2'>
                                { d.totalUmsatz } $
                            </div>
                        </div>
                        <div className='d-flex'> 
                            <Buttony className="w-max px-3" onClick={DeleteActionRow} > Alles löschen </Buttony> 
                            <div className='p-1 px-3 adduserbtn cursor-pointer bg-green-600 ml-3' onClick={()=> setOpenAddRow(true)}><i className="fas fa-plus text-white p0"></i></div>
                        </div>
                    </div>
                    
                    <div className="ode_table ode_table_deta">
                        
                        <div className="ode_tableHead_details">
                            <div className="ode_tr d-flex align-items-center justify-content-start">
                                <div className="ode_td flex-grow-1 p2 titleP500 pdta"> Name </div>
                                <div className="ode_td flex-grow-1 p2 titleP500 pdta"> Nummer </div>
                                <div className="ode_td flex-grow-1 p2 titleP500 pdta"> Menge </div>
                                <div className="ode_td flex-grow-1 p2 titleP500 pdta"> Einheit </div>
                                <div className="ode_td flex-grow-1 p2 titleP500 pdta action-td"> Actions </div>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            { d && articels.map( (item, index) => <div key={'detrot'+index+item.id}><TableRowDetails setNewValue={setNewValue} open={open} newValue={newValue} handleDelete={handleDelete} handleUpdate={handleUpdate} handleOpenUpdate={handleOpenUpdate} type={d.type}  data= {item} /></div> ) }
                        </div>


                        <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={openAddRow} //-----------
                            >
                                <div className='upovetcont'>
                                    <p className="p3 titleP500 w-full sm:w-max">Überstunden änderen</p> 
                                    <div className='mt-5'>
                                        
                                        <Select
                                            className='mb-3 w-full'
                                            labelId=" "
                                            value={WareItem}
                                            label=" "
                                            onChange={(e)=>setWareItem(e.target.value)}
                                        >
                                            { conx.state.warenData && conx.state.warenData.map((item, index) => <MenuItem key={"itt"+index} value={item}> { `${item.title} || ${item.number}`  } </MenuItem> ) }
                                            
                                        </Select>


                                        <TextField
                                            className='w-full'
                                            value={props.newValue}
                                            label="Menge"
                                            type="number"
                                            InputLabelProps={{shrink: true,}}
                                            onChange={(e)=> {setMenge(e.target.value)}}
                                        />

                                        <Buttony onClick={() => handleAddRow()} className="w-full h-12 mt-4 bg-green-700"> Speicheren </Buttony>  
                                    </div>
                                </div>
                        </Backdrop>

                    </div>
                </div>


                
            </div>
        </div>
    )
}





const TableRowDetails = (props) => {
    const d = props.data;


    return(
        <div className="ode_tr ode_tr_det flex items-center justify-between">
            <div className="ode_td flex-grow-1 p1-5"> { d.title } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.number } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.amount } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.unit } </div>
            <div className="ode_td flex-grow-1 -5 flex items-center action-td"> 
                <Buttony className="w-10 mr-3" onClick={()=> props.handleOpenUpdate(d.id)}><i className="fas fa-edit"></i></Buttony> 
                <Buttony className="w-10" onClick={()=> props.handleDelete(props.type, d.id)} ><i className="fas fa-trash"></i></Buttony>
            </div>



            <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={props.open} //-----------
                >
                    <div className='upovetcont'>
                        <p className="p3 titleP500 w-full sm:w-max">Überstunden änderen</p> 
                        <div className='mt-5'>
                            <TextField
                                className='w-full'
                                value={props.newValue}
                                label="Minute"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e)=> {props.setNewValue(e.target.value)}}
                            />

                            <Buttony onClick={() => props.handleUpdate(props.type, d.id)} className="w-full h-12 mt-4 bg-green-700"> Speicheren </Buttony>  
                        </div>
                    </div>
            </Backdrop>
        </div>
    )
}


export default Statistics;