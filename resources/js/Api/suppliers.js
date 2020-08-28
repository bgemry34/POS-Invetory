import axios from 'axios'

const url = 'http://posinventory.test/api';

export const fetchSupplier = async ()=> {
    try{
        const {data} = await axios.get(`${url}/supplier`);
        return data;
    }catch(error){
        console.log(error.response)
    }
}

export const createSupplier = (Name, Address, PhoneNumber) =>   {
    const data =  axios.post(`${url}/supplier/create`,{Name, Address, PhoneNumber})
    .then(res=>res)
    .catch(error=>error.response);
    return data
}



export const deleteSupplier =  (SupplierId) => {
    const data =  axios.delete(`${url}/supplier/delete`, {data:{SupplierId}})
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}

export const updateSupplier =  (SupplierId, Name, Address, PhoneNumber) => {
    const data =  axios.put(`${url}/supplier/update`, {SupplierId, Name, Address, PhoneNumber})
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}

export const deleteImage =  (Image) => {
    const data =  axios.delete(`${url}/items/deleteImage`, {data:{Image}})
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}