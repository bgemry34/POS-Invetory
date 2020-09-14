import React, {useState, useCallback, useContext, useEffect, useRef} from 'react';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import { UserContext } from '../Context/UserContext';
import {
    Button,
    AppBar,
    Toolbar,
    Dialog,
    Typography,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Tabs,
    Tab,
    Box,
    Grid,  
    MenuList,
    MenuItem,
    Popper,
    Paper,
    Grow,
    ClickAwayListener 
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import Register from './Register';
import Login from './Login';
import {checkUser} from './../../../Api/users'
import {NavLink} from 'react-router-dom';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {logoutUser} from './../../../Api/users'

//style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '10px'
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  nav: {
    zIndex:1,
    display:'grid',
    gridTemplateColumns:'1fr 1fr'
  },
  btn: {
    outline:'none !important'
  }
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

//main function
export default function Navbar() {
  const classes = useStyles();

  const [openLogin, setOpenLogin] = useState(false);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [userNav, setUserNav] = useState(null)
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const { user, setUser } = useContext(UserContext);
  
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(()=>{
    const _user = JSON.parse(sessionStorage.getItem('user'));
    const initUser = async ()=>{
      const __user__ = await checkUser(_user.access_token);
      if(__user__.status == 200)
      setUser(__user__.data);
    }
    try{
      if(_user !==null)
      initUser();
    }catch(e){
      console.log(e)
    }
  },[])

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const logout = async () =>{
    console.log('clicked logout')
    const res = await logoutUser(user.access_token)
    if(res.status == 200){
    sessionStorage.clear();
    window.location.reload(false);}
  }


  const LoginModal = (
    <Dialog fullWidth open={openLogin} onClose={()=>setOpenLogin(false)} aria-labelledby="form-dialog-title">
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab style={{outline:'none'}} label="Login" {...a11yProps(0)} />
            <Tab style={{outline:'none'}} label="Register" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <DialogContent>
          <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Login setOpenLogin={setOpenLogin} />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Register setOpenLogin={setOpenLogin} />
          </TabPanel>
        </SwipeableViews>
        </DialogContent>
      </Dialog>
    )
    
    const profile = (
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          color="inherit"
          className={classes.btn}
          aria-haspopup="true"
          onClick={handleToggle}
          endIcon={<ArrowDropDownIcon />}
        >
          {JSON.parse(sessionStorage.getItem('user'))===null ? 'User' : (JSON.parse(sessionStorage.getItem('user')).name==null ? 'User' : JSON.parse(sessionStorage.getItem('user')).name)}
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition placement="bottom-end" disablePortal>
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        </div>
    )
    
    //NAVIGATION
    const initNav = (
      <nav className={classes.nav}>
        <Button  className={classes.btn} color="inherit" startIcon={<ShoppingCartIcon />} >My Cart</Button>
        {
        JSON.parse(sessionStorage.getItem('user')) === null ? (<Button  className={classes.btn} color="inherit" onClick={()=>setOpenLogin(true)}>Login</Button>)
        : profile
        }
      </nav>
    )
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Shop
          </Typography>
          {initNav}
        </Toolbar>
      </AppBar>
      {LoginModal}
    </div>
  );
}