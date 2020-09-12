import axios from 'axios'

const url = 'http://posinventory.test/api';

export const userLogin = (user) =>{
    const {email, password} = user
    const loginRes = axios.post(`${url}/users/login`, {'email':email[0], 'password':password[0]})
    .then(loginRes=>{
        if(loginRes.status === 200){
            const res = axios.post(`${url}/users/me?token=${loginRes.data.access_token}`)
            .then(res=>{
                res.data.access_token = loginRes.data.access_token;
                return res
            })
            .catch(error=>error.response);
            return res;
        }else{
            return loginRes
        }
    })
    .catch(error=>error.response);
    return loginRes
}

export const checkUser = (token) => {
    const res = axios.post(`${url}/users/me?token=${token}`)
    .then(res=>{
        if(res.status==200)
        res.data.access_token = token;
        return res
    })
    .catch(error=>error.response);
    return res;
}