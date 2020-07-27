import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import {makeStyles} from '@material-ui/styles';
import {
    AppBar, Hidden, IconButton, Toolbar, Button, withStyles,
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {useFirebase} from 'react-redux-firebase';
import {logout} from '../../Authentication/authenticationSlice';
import {app} from '../../../config/config';
import routes from '../../../config/routes';
import Logo from '../../Logo/Logo';
import Loading from "../Feedback/Loading/Loading"

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
    },
    flexGrow: {
        flexGrow: 1,
    },
    signOutButton: {
        marginLeft: theme.spacing(1),
        color: theme.palette.white,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const LogoButton = withStyles((theme) => ({
    root: {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}))(Button);

const TopMenu = ({onSidebarOpen, minimalLayout}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const firebase = useFirebase();

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout(firebase));
    };
    let layout;
    if (minimalLayout) {
        layout = (
            <AppBar className={clsx(classes.root)}>
                <Toolbar>
                    <NavLink to={routes.default}>
                        <Button
                            color="primary"
                            startIcon={<Logo/>}
                        >
                            {app.name}
                        </Button>
                    </NavLink>
                    <div className={classes.flexGrow}/>

                </Toolbar>
            </AppBar>
        );
    } else {
        layout = (
            <AppBar className={clsx(classes.root)}>
                <Toolbar>
                    <NavLink to={routes.default}>
                        <LogoButton
                            color="primary"
                            startIcon={<Logo/>}
                        >
                            {app.name}
                        </LogoButton>
                    </NavLink>
                    <div className={classes.flexGrow}/>
                    <Hidden mdDown>
                        <IconButton
                            className={classes.signOutButton}
                            onClick={handleLogout}
                        >
                            <InputIcon/>
                        </IconButton>
                    </Hidden>
                    <Hidden lgUp>
                        <IconButton color="inherit" onClick={onSidebarOpen}>
                            <MenuIcon/>
                        </IconButton>
                    </Hidden>
                </Toolbar>
                <Loading/>
            </AppBar>
        );
    }

    return layout;
};

TopMenu.defaultProps = {
    minimalLayout: true,
    onSidebarOpen: () => {
    },
};
TopMenu.propTypes = {
    minimalLayout: PropTypes.bool,
    onSidebarOpen: PropTypes.func,
};

export default TopMenu;
