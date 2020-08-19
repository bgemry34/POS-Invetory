import axios from 'axios'

const url = 'http://posinventory.test/api';

export const fetchItems = async () =>{
    try{
        const {data} = await axios.get(`${url}/items`);
        return data;
    }catch(error){
        console.log(error)
    }
}

export const fetchCategories = async () =>{
    try{
        const {data} = await axios.get(`${url}/category`);
        return data;
    }catch(error){
        console.log(error)
    }
}

export const addItem =  (Name, Price, SellPrice, Category, Qty, Supplier, Images=[]) => {
    const fd = new FormData();
    if(Images.length > 0)
    Images.forEach(Image=>{
        fd.append('Images[]', Image, Image.name)
    })
    fd.append('Name',Name);
    fd.append('Price', Price);
    fd.append('SellPrice', SellPrice);
    fd.append('Category', Category);
    fd.append('Qty', Qty); 
    fd.append('Supplier', Supplier);       
    const data = axios.post(`${url}/items/create`, fd)
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}

export const addCategory = (Name) =>{
    const data = axios.post(`${url}/category/create`, {Name})
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}

export const removeCategory = (CategoryId) =>{
    const data = axios.delete(`${url}/category/delete`, {data:{CategoryId}})
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}