import React from 'react'
import styles from './Home.module.css'
import {Button, Typography, makeStyles} from '@material-ui/core';
import cx from 'classnames'
import inventory from './inventory.jpg'
import pos from './pos.png'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles(() => ({
    pos: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${pos})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        color:'#f4f4f4',
    },
    inventory: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${inventory})`,
        backgroundPosition: 'center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        color:'#f4f4f4',
    },
}));

function Home() {
    const classes = useStyles();
    document.title = 'Home';
    return (
        <div className={styles.container}>
            <div>
                <NavLink to="/login">
                    <Button className={cx(styles.selection, classes.inventory)} fullWidth>
                        <Typography variant="h3">
                            Inventory
                        </Typography>
                    </Button>
                </NavLink>
            </div>
            <div>
                <Button variant="contained" className={cx(styles.selection, classes.pos)} fullWidth>
                    <Typography variant="h3">
                        POS
                    </Typography>
                </Button>
            </div>
        </div>
    )
}

export default Home
