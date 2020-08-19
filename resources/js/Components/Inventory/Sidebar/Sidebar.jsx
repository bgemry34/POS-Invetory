import React from 'react';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { MainListItems, SecondaryListItems } from './ListItems';
import {useStyles} from './../Dashboard/Dashboard.style'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Dashboard from './../Dashboard/Dashboard'
import Items from './../Items/Items'
import Suppliers from './../Suppliers/Suppliers'


import {
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge,
} from '@material-ui/core'

const Sidebar = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [title, setTitle] = React.useState('');
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  document.title = `Inventory | ${title}`;
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return(
    <Router>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {title}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <Typography 
          className="mr-3 mt-1" 
          variant="h5" gutterBottom>
            Inventory
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </div>
        <Divider />
          <List>
            <MainListItems setTitle={setTitle} />
          </List>
        <Divider />
          <List>
            <SecondaryListItems setTitle={setTitle} />
          </List>
      </Drawer>
      <main className={classes.content}>
          <Switch>
            <Route path="/Inventory/" exact >
              <Dashboard setTitle={setTitle} />
            </Route>
            <Route path="/Inventory/Items" >
              <Items setTitle={setTitle} />
            </Route>
            <Route path="/Inventory/Suppliers" >
              <Suppliers setTitle={setTitle} />
            </Route>
          </Switch>
        
      </main>
    </div>
    </Router>
  );
}

export default Sidebar