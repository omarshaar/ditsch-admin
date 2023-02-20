import React, { useEffect , useState } from "react";
import './Home.css';

import { Containery } from "../../components/global/Container/container";
import { InfoCard } from "../../components/privte/infoCard/InfoCard";
import ReactApexChart from "react-apexcharts";
import Button from "../../components/global/button/Button";
// api
import { getThisMonthUmsatz } from "../../service/dashbord";
import { getLastMonthUmsatz } from "../../service/dashbord";
import { getLast6MonthUmsatzChart } from "../../service/dashbord";
import { getLastTransactions } from "../../service/dashbord";




export const Home = () => {

  const [ thisMonthUmsatz, setThisMonthUmsatz ] = useState(0);
  const [ lastMonthUmsatz, setLastMonthUmsatz ] = useState(0);
  const [ showChart , setShowChart ] = useState(false);
  const [ transData, setTransData ] = useState(null);
  const [ chartsState , setChartsState ] = useState({
      series: [{
        name: 'umsatz',
        data: []
      }],
      options: {
        chart: {
          height: 350,
          width: "100%",
          type: 'area',
          foreColor: '#000'
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: 'category',
          categories: []
        },
        fill: {
          colors: ['#A2271C']
        },
        stroke: {
          curve: 'smooth',
          colors: ['#A2271C']
        },
        tickPlacement: 'between',
        tooltip: {
          x: {
            format: 'yy/MM/dd'
          },
        },
      },
    
  });

  const tagsComponents = {
    "bruch" : <div className="p1 status badgeSoftDanger">Bruch</div>,
    "verkauf" : <div className="p1 status badgeSoftSuccess">Verkauf</div>,
    "liefer" : <div className="p1 status badgeSoftWarning">Lieferschein</div>
  }

  useEffect(()=>{
    getData();
  },[]);

  function getData() {
    getThisMonthUmsatz().then(d => d.sum != null && setThisMonthUmsatz(d.sum));
    getLastMonthUmsatz().then(d => d.sum != null && setLastMonthUmsatz(d.sum));
    getLast6MonthUmsatzChart().then(handleChartData);
    getLastTransactions(3).then(handleTransData);
  }

  function handleChartData(data) {
    let month = [], total_umsatz = [];

    data.map(item => {
      month.push(item.month);
      total_umsatz.push(item.total_umsatz);
    });

    chartsState.options.xaxis.categories = month;
    chartsState.series[0].data = total_umsatz;

    setChartsState({...chartsState});
    setShowChart(true);
  }

  function handleTransData(data) {
    const all = [];
    
    // spreed
    Object.keys(data).map(key => {
      data[key].map(item => {
        if(item.artikelsObj == "null") return;
        item.component = tagsComponents[key];
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
    setTransData(all);
  }


















  return(
        <div className="HomePage" id="HomePage">
            <Containery>
                <div>
                    <p className="p2 titleP500">Over view</p>
                    <div className="gridContainer gridsec1">
                        <InfoCard
                            title="TOTAL EARNINGS" 
                            updown="+16.24 %" 
                            value = {thisMonthUmsatz + " $"}
                            linkTitle = "View net earnings"
                            icon = {<svg className="inforCardICon" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5"  stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <circle cx="12" cy="12" r="9" /> <path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1 -1.8 -1" /> <path d="M12 6v2m0 8v2" /> </svg>}
                        />

                        <InfoCard 
                            title="ORDERS" 
                            updown="-3.57 %" 
                            value = {lastMonthUmsatz + " $"}
                            linkTitle = "View all orders"
                            icon = {<svg xmlns="http://www.w3.org/2000/svg" className="inforCardICon" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#fff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <polyline points="7 10 12 4 17 10" />
                            <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z" />
                            <circle cx="12" cy="15" r="2" />
                          </svg>}
                        />
                    </div>
                </div>

                <div style={{marginTop: '20px'}}>
                    <div className="HomeChartscontainer gridContainer">
                      <div className="chartsContainer cardContainer">
                        <div className="cardContainerHeader">
                            <p className="p2" style={{opacity: 0.7}}>UMSATZ ÜBERBLICK</p>
                        </div>

                        { showChart && 
                        <ReactApexChart options={chartsState.options} series={chartsState.series} type="area" height={300} />
                        }
                      </div>
                    </div>
                </div>

                <div className="TableContainer">
                  <div> <p className="p3 titleP500" > Lastest Transaction  </p> </div>

                  <div style={{overflowY: "auto"}}> 
                    <div className="ode_table">

                      <div className="ode_tableHead">
                        <div className="ode_tr d-flex align-items-center justify-content-start">
                          <div className="ode_td flex-grow-1 p2 titleP500"> ID </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Mitarbeiter </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Datum </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Payment Status </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> Total </div>
                          <div className="ode_td flex-grow-1 p2 titleP500"> View Details </div>
                        </div>
                      </div>

                      <div className="ode_tableBody">
                        { transData && transData.map( (item, index) => 
                          <div key={'daraar'+index} className="ode_tr d-flex align-items-center justify-content-start">
                            <div className="ode_td flex-grow-1 p1-5 titleP500"> #{ item.id } </div>
                            <div className="ode_td flex-grow-1 p1-5"> { item.userName } </div>
                            <div className="ode_td flex-grow-1 p1-5"> { item.date } </div>
                            <div className="ode_td flex-grow-1 p1-5"> { item.component } </div>
                            <div className="ode_td flex-grow-1 p1-5"> { item.sum } </div>
                            <div className="ode_td flex-grow-1 p1-5"> <Button>View Details</Button> </div>
                          </div>
                        ) }
                      </div>
                    </div>
                  </div>

                </div>
            </Containery>
        </div>
    )
}


