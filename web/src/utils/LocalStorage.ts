const CLIENTINFO = 'client_info';

const setClientInfo = (value)=>{
    localStorage.setItem(CLIENTINFO, JSON.stringify(value))
}

const getClientInfo = ()=>{
    const obj = localStorage.getItem(CLIENTINFO)
    if(obj) return JSON.parse(obj);
    return { id : ''};
}

export {
    setClientInfo,
    getClientInfo,
}