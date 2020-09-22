import axios from 'axios'

const url = 'http://posinventory.test/api';

export const addCart = (token, item_id) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
    }
    const res = axios.post(`${url}/cart/create`, {
        'qty': 1,
        item_id
    }, headers)
    .then(res=>res)
    .catch(error=>error.response);
    return res;
}
