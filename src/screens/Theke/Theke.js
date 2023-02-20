import './Theke.css';
import { useState, useCallback } from 'react';
import { Containery } from '../../components/global/Container/container';
import Buttony from '../../components/global/button/Button';
// api
import { getThekeList, removeThekeItem } from '../../service/main';
import { useEffect } from 'react';
// image viewer
import ImageViewer from 'react-simple-image-viewer';

const Theke = () => {
    return (
        <div className="Theke-page">
            <Containery>
                <div className='flex items-center justify-between'>
                    <p className="p2 titleP500"> Theke </p>
                    <div className='p-1 px-3 adduserbtn cursor-pointer'><i className="fas fa-tools text-white p0"></i></div>
                </div>
                <div>
                    <TableContainer />
                </div>
            </Containery>
        </div>
    );
}








const TableContainer = () => {
    const [ cleanedList, setCleanedList ] = useState(null);

    useEffect(()=>{
        getData();
    },[]);

    const getData = () =>  getThekeList().then(handleCleanedList);
    const handleCleanedList = (data) => setCleanedList(data);
    const reload = () => setTimeout(getData, 800);



    return(
        <div className="TableContainer">

            <div className='flex items-center justify-between'> 
                <p className="p3 titleP500">Letzte Aktivitäten</p> 
            </div>

            <div className='overflow-y-auto'> 
                <div className="ode_table ode_table2">

                    <div className="ode_tableHead">
                        <div className="ode_tr d-flex align-items-center justify-content-start">
                          <div className="ode_td flex-grow-1 p2 titleP500"> Foto </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Mitarbeiter </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Datum </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Zeit </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Aufgabe </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Action </div>
                        </div>
                    </div>

                    <div className="ode_tableBody flex flex-col-reverse ">
                        { cleanedList && cleanedList.map((item, index) =>  <div key={'cleandList'+index}><TableRow reload={reload} data={item} /></div> )}
                    </div>
                    
                </div>
            </div>

        </div>
    );
}



const TableRow = (props) => {
    const d = props.data;
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = [d.imagePath];

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);
    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const deleteAufgabe = (id) =>{
        window.confirm('Are you sure you want to delete? ') &&
        removeThekeItem(id).then(data => data == 'successfully' && props.reload());
    }
    
    return(
        <div className="ode_tr d-flex align-items-center justify-content-start">
            <div className="ode_td flex-grow-1 -5">
                { images.map((src, index) => <img key={'imgcle'+index} src={src} className='w-full lg:w-2/3 h-24 object-cover rounded-md cursor-pointer' onClick={ () => openImageViewer(index) }/>  ) } 
            </div>
            <div className="ode_td flex-grow-1 p1-5 titleP500"> { d.userName } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.date } </div>
            <div className="ode_td flex-grow-1 p1-5"> { d.time } </div>
            <div className="ode_td flex-grow-1 p1-5"> { (JSON.parse(d.TaskObject)).title } </div>
            <div className="ode_td flex-grow-1 p1-5" onClick={()=> deleteAufgabe(d.id)}> <Buttony className="w-16"><i className="fas fa-trash"></i></Buttony> </div>

            { isViewerOpen && (
                <div className='isoverall'>
                <ImageViewer
                src={ images }
                currentIndex={ currentImage }
                disableScroll={ false }
                closeOnClickOutside={ true }
                onClose={ closeImageViewer }
            />
            </div>
        )}
        </div>
    )
}


export default Theke;


