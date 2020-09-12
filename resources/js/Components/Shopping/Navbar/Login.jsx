import React, {useContext, useCallback} from 'react'
import clsx from 'clsx';
import { TextField, Button, FormControl, makeStyles, CircularProgress } from '@material-ui/core'
import { UserContext } from '../Context/UserContext';
import { useState } from 'react';
import {userLogin} from './../../../Api/users'

const Login = ({setOpenLogin}) => {

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          alignItems: 'center',
        },
        wrapper: {
          margin: theme.spacing(1),
          position: 'relative',
        },
        buttonProgress: {
          color: '#7f8c8d',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: -12,
          marginLeft: -12,
        },
      }));

    const { setUser } = useContext(UserContext);

    const [login, setLogin] = useState({
        email:'',
        password:''
    })

    const classes = useStyles();

    const [loading, setLoading] = useState(false);

    const handleChange = useCallback((e)=>{
        setLogin({...login, [e.target.name]:[e.target.value]});
    }, [login, setLogin])

    const onSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true)
        try{
            const res = await  userLogin(login);
            const {data, status} = res;
            if(status == 200){
                sessionStorage.setItem('user',JSON.stringify(data));
                setUser(data);
                console.log(data)
                setOpenLogin(false);
            }
            setLoading(false)
        }catch(e){
            console.log(e);
            setLoading(false)
        }finally{
            setLoading(false)
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit} action="">
            <TextField
                label="Email Address..." 
                margin="normal"
                type="email"
                name="email"
                value={login.email}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={login.password}
                onChange={handleChange}
                margin="normal" 
                autoComplete="current-password"
                fullWidth
                required
            />
           <FormControl margin="normal" fullWidth>
           <div className={classes.wrapper}>
                <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                fullWidth
                >
                Login
                </Button>
                {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
           </FormControl>
            </form>
        </div>
    )
}

export default Login
