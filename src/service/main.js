import axios from "axios";

const ApiHostUrl = "https://admin-ditsch-api.oderasid.com";

export const getCleanedList = async () =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getCleanedList`);
    return Respo.data;
}

export const getThekeList = async () =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getThekeList`);
    return Respo.data;
}

export const getEmployees = async (verified) =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getEmployees&verified=${verified}`);
    return Respo.data;
}

export const editEmployee = async (changedObject, targetUser) =>{
    const Respo = await axios.post( `${ApiHostUrl}`, {req: "editEmployee", changed: changedObject, targetUser: targetUser});
    return Respo.data;
}

export const removeCleanedItem = async (id) =>{
    const Respo = await axios.post( `${ApiHostUrl}`, {req: "removeCleanedItem", id: id});
    return Respo.data;
}

export const removeThekeItem = async (id) =>{
    const Respo = await axios.post(`${ApiHostUrl}`, {req: "removeThekeItem", id: id});
    return Respo.data;
}


export const UpdateTransActionItems = async (cate, id, amount, obj, number) =>{
    const Respo = await axios.post( `${ApiHostUrl}`, {req: "UpdateTransActionItems", cate: cate, id: id, amount: amount, obj: JSON.stringify(obj), number: number});
    return Respo.data;
}

export const deleteTransactoinRow = async (cate, id, Objects, length) =>{
    const Respo = await axios.post(`${ApiHostUrl}`, {req: 'deleteTransactoinRow', cate: cate, id: id, articels: Objects, length: length});
    return Respo.data;
}

export const acceptUser = async (id) =>{
    const Respo = await axios.post(`${ApiHostUrl}`, {req: 'acceptUser', id: id});
    return Respo.data;
}

export const deletetUser = async (id) =>{
    const Respo = await axios.post(`${ApiHostUrl}`, {req: 'deletetUser', id: id});
    return Respo.data;
}

export const getEmployeeAuszahlung = async (id) =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getEmployeeAuszahlung&id=${id}`);
    return Respo.data;
}

export const getEmployeesOverTimes = async () =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getEmployeesOverTimes`);
    return Respo.data;
}


export const acceptOverTime = async (obj) =>{
    const Respo = await axios.post( `${ApiHostUrl}` , JSON.stringify(obj));
    return Respo.data;
}

export const removeOverTime = async (obj) =>{
    const Respo = await axios.post(`${ApiHostUrl}` , JSON.stringify(obj));
    return Respo.data;
}

export const getAllArticle = async () =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=allArticle`);
    return Respo.data;
}

export const getSumOfKaffe = async () =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getKaffes`);
    return Respo.data;
}

export const updateKaffeSum = async (obj) =>{
    const Respo = await axios.post(`${ApiHostUrl}` , JSON.stringify(obj));
    return Respo.data;
}

export const getKaffeAllMonth = async (date) =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getKaffeAllMonth&date=${date}`);
    return Respo.data;
}

export const getActivitys = async (id, date) =>{
    const Respo = await axios.get( `${ApiHostUrl}?req=getActivitys&id=${id}&date=${date}`);
    return Respo.data;
}


export const handleAdminLogIn = async (obj) =>{
    const Respo = await axios.post(`${ApiHostUrl}` , JSON.stringify(obj));
    return Respo.data; 
}