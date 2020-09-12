import React from 'react'
import { TextField, Button, FormControl } from '@material-ui/core'
function Register() {
    return (
        <div>
            <form action="">
            <TextField 
            id="standard-basic" 
            label="Email"
            type="email" 
            margin="normal"
            required
            fullWidth
            />
            <TextField 
            id="standard-basic" 
            label="Full Name" 
            margin="normal"
            required
            fullWidth
            />
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                margin="normal" 
                required
                autoComplete="current-password"
                fullWidth
            />
            <TextField
                id="standard-password-input"
                label="Confirm Password"
                type="password"
                margin="normal" 
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
