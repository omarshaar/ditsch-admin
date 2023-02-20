import axios from "axios";

const ApiHostUrl = "https://admin-ditsch-api.oderasid.com";


export const getThisMonthUmsatz = async () =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getThisMonthUmsatz`);
    return Respo.data;
}
export const getLastMonthUmsatz = async () =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getPrevMonthUmsatz`);
    return Respo.data;
}

export const getLast6MonthUmsatzChart = async () =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getLast6MonthUmsatzChart`);
    return Respo.data;
}

export const getLastTransactions = async (limit) =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getLastTransactions&limit=${limit}`);
    return Respo.data;
}