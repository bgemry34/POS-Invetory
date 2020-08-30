import React from 'react';
import {ListItem,
        ListItemIcon,
        ListItemText,
        ListSubheader, 
        makeStyles} from '@material-ui/core'
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StorageIcon from '@material-ui/icons/Storage';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import {NavLink} from 'react-router-dom'

// const addNavLink = (Name, Icon, Link){

// }


export const MainListItems = ({setTitle}) => (
  <div>
      <ListItem button
      component={NavLink}
      to="/Admin/Inventory/"
      exact
      activeStyle={{
        backgroundColor:'#ecf0f1'
      }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

    <ListItem button
    component={NavLink}
    to="/Admin/Inventory/Items"
    activeStyle={{
      backgroundColor:'#ecf0f1'
    }}
    >
      <ListItemIcon>
        <StorageIcon />
      </ListItemIcon>
      <ListItemText primary="Items" />
    </ListItem>

    <ListItem button
    component={NavLink}
    to="/Admin/Inventory/Suppliers"
    activeStyle={{
      backgroundColor:'#ecf0f1'
    }}>
      <ListItemIcon>
        <LocalShippingIcon />
      </ListItemIcon>
      <ListItemText primary="Supplier" />
    </ListItem>

    <ListItem button
    component={NavLink}
    to="/Admin/Inventory/Stocks"
    activeStyle={{
      backgroundColor:'#ecf0f1'
    }}>
      <ListItemIcon>
        <i className="fab fa-dropbox fa-2x"></i>
      </ListItemIcon>
      <ListItemText primary="Stocks" />
    </ListItem>
  </div>
);

export const SecondaryListItems = ()=> (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);