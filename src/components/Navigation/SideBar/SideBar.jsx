import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {Drawer, Hidden, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

import NavigationItems from '../NavigationItems/NavigationItems';
import InputIcon from "@material-ui/icons/Input"
import {logout} from "../../Authentication/authenticationSlice"
import {useDispatch} from "react-redux"
import {useFirebase} from "react-redux-firebase"

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: 240,
        [theme.breakpoints.up('lg')]: {
            marginTop: 64,
            height: 'calc(100% - 64px)'
        }
    },
    root: {
        backgroundColor: theme.palette.white,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: theme.spacing(2)
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
    nav: {
        marginBottom: theme.spacing(2)
    },
    signOutButton: {
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium
    }
}));

const SideBar = ({
                     open, variant, onClose
                 }) => {
    const classes = useStyles();


    const dispatch = useDispatch();
    const firebase = useFirebase();
    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout(firebase));
    };

    return (

        <Drawer
            anchor="left"
            classes={{paper: classes.drawer}}
            onClose={onClose}
            open={open}
            variant={variant}
        >
            <div

                className={clsx(classes.root)}
            >
                <Hidden lgUp>
                    <Button
                        className={classes.signOutButton}
                        onClick={handleLogout}
                    >
                        <InputIcon/>
                    </Button>
                </Hidden>
                {/* <Profile /> */}
                {/*<Divider className={classes.divider} />*/}
                <NavigationItems/>
            </div>
        </Drawer>

    );
};

SideBar.defaultProps = {
    className: '',
};
SideBar.propTypes = {
    className: PropTypes.string,
    open: PropTypes.bool.isRequired,
    variant: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};


export default SideBar;
