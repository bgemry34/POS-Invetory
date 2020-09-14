import React, {useContext, useState} from 'react'
import { TextField, Button, FormControl } from '@material-ui/core'
import {registerUser} from './../../../Api/users'
import { UserContext } from '../Context/UserContext';

const Register = ({setOpenLogin}) => {
    const { setUser } = useContext(UserContext);

    const [form, setForm] = useState({
        email:'',
        name:'',
        password:'',
        password_confirmation:''
    })

    const [errors, setErrors] = useState({
        password:false,
        password_confirmation:false
    })

    const register = async (e) =>{
        setErrors({
        password:false,
        password_confirmation:false
        })
        if(form.password.length < 8){
            setErrors({password:'Password Must have at least 8 characters length.'})
        }if(form.password!==form.password_confirmation){
            setErrors({password_confirmation:'Password field is not same as Confirm Password field.'})
        }
        e.preventDefault();
        const res = await registerUser(form)
        const {data, status} = res;
        console.log(res)
        if(status == 201){
            setUser({...data.user, access_token:data.token})
            sessionStorage.setItem('user',JSON.stringify({...data.user, access_token:data.token}));
            setOpenLogin(false)
        }
    }

    const handleChange = async (e) =>{
        setForm({...form, [e.target.name]:e.target.value})
    }

    return (
        <div>
            <form onSubmit={register}>
            <TextField
            label="Email"
            type="email" 
            name="email"
            margin="normal"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            />
            <TextField 
            label="Full Name"
            name="name" 
            value={form.name}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            />

            <TextField
            label="Password"
            type="password"
            name="password"
            error={errors.password && true}
            helperText={errors.password}
            margin="normal"
             onChange={handleChange}
            value={form.password} 
            required
            autoComplete="current-password"
            fullWidth
            />

            <TextField
            label="Confirm Password"
            name="password_confirmation"
            error={errors.password_confirmation && true}
            helperText={errors.password_confirmation}
            type="password"
            margin="normal" 
            value={form.password_confirmation} 
            onChange={handleChange}
            required
            autoComplete="current-password"
            fullWidth
            />
           <FormControl margin="normal" fullWidth>
                <Button variant="contained" fullWidth color="primary" type="submit" >
                    Register
                </Button>
           </FormControl>
            </form>
        </div>
    )
}

export default Register
