import React from 'react';
import {makeStyles, 
    Container, 
    Typography, 
    Grid, 
    Box, 
    Link, 
    Checkbox, 
    FormControlLabel,
    TextField, 
    CssBaseline, 
    Button, 
    Avatar} from '@material-ui/core';
  import { Link as RouterLink } from 'react-router-dom'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {useStyles} from './Login.style';

export default function SignIn() {
  const classes = useStyles();
  document.title = 'Inventory | Login';

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <RouterLink to="/Inventory">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </RouterLink>
        </form>
      </div>
    </Container>
  );
}