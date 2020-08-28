import axios from 'axios'

const url = 'http://posinventory.test/api';

export const fetchItems = async (page = '') =>{
    try{
        const {data} = await axios.get(`${url}/items${page}`);
        return data;
    }catch(error){
        return error.response
    }
}

export const fetchCategories = async () =>{
    try{
        const {data} = await axios.get(`${url}/category`);
        return data;
    }catch(error){
        return error.response
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

export const removeItem = (ItemId)=>{
    const data = axios.delete(`${url}/items/delete`, {data:{ItemId}})
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}

export const  updateItem = (ItemId, Name, Price, SellPrice, Category, Qty, Images)=>{
    const fd = new FormData();
    if(Images.length > 0)
    Images.forEach(Image=>{
        fd.append('Images[]', Image, Image.name)
    })

    fd.append('ItemId',ItemId);
    fd.append('Name',Name);
    fd.append('Price', Price);
    fd.append('SellPrice', SellPrice);
    fd.append('Category', Category);
    fd.append('Qty', Qty);
    fd.append('_method', 'put');

    const data = axios.post(`${url}/items/update`, fd)
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}

export const deleteImage = (Image) =>{
    const fd = new FormData();
    fd.append('Image',Image);
    fd.append('_method','delete');
    const data = axios.post(`${url}/items/deleteImage`, fd)
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}

export const addStock = (Item, Supplier, Qty) =>{
    const data = axios.post(`${url}/stock/create`, {Item, Supplier, Qty})
    .then(res=>res)
    .catch(error=>error.response);
    return data;
}

export const searchItem = async (search, page='') => {
    try{
        const {data} = await axios.get(`${url}/items${page}`);
        return data;
    }catch(error){
        return error.response
    }
}