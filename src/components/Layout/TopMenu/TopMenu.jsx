import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import {makeStyles} from '@material-ui/styles';
import {
    AppBar, Hidden, IconButton, Toolbar, withStyles,
} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {useFirebase} from 'react-redux-firebase';
import {logout} from '../../Authentication/authenticationSlice';
import {app} from '../../../config/config';
import routes from '../../../config/routes';
import Logo from '../../Logo/Logo';
import Loading from "../Feedback/Loading/Loading"
import LanguageIcon from '@material-ui/icons/Translate';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NoSsr from "@material-ui/core/NoSsr"
import {LANGUAGES_LABELS} from "../../../config/config"

import {useTranslation} from "react-i18next"


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
    language: {
        margin: theme.spacing(0, 0.5, 0, 1),
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        },
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
    const {t, i18n} = useTranslation('dashboard');
    const userLanguage = i18n.language
    const [languageMenu, setLanguageMenu] = React.useState(null);

    const handleLanguageIconClick = (event) => {
        setLanguageMenu(event.currentTarget);
    };

    const handleLanguageMenuClose = (event) => {
        if (event.currentTarget.nodeName === 'A') {
            document.cookie = `userLanguage=noDefault;path=/;max-age=31536000`;
        }
        setLanguageMenu(null);
    };

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode)
        setLanguageMenu(null);
    }

    const handleLogout = (event) => {
        event.preventDefault();
        dispatch(logout(firebase));
    };

    const languageButton = <>
        <Button
            color="inherit"
            aria-owns={languageMenu ? 'language-menu' : undefined}
            aria-haspopup="true"
            aria-label={t('changeLanguage')}
            onClick={handleLanguageIconClick}
            data-ga-event-category="header"
            data-ga-event-action="language"
        >
            <LanguageIcon/>
            <span className={classes.language}>
                {LANGUAGES_LABELS.filter((language) => language.code === userLanguage)[0]?.text}
              </span>
            <ExpandMoreIcon fontSize="small"/>
        </Button>
        <NoSsr defer>
            <Menu
                id="language-menu"
                anchorEl={languageMenu}
                open={Boolean(languageMenu)}
                onClose={handleLanguageMenuClose}
            >
                {LANGUAGES_LABELS.map((language) => (
                    <MenuItem
                        component="a"
                        data-no-link="true"
                        key={language.code}
                        selected={userLanguage === language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        lang={language.code}
                        hrefLang={language.code}
                    >
                        {language.text}
                    </MenuItem>
                ))}
            </Menu>
        </NoSsr>
    </>

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
                    {languageButton}
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
                    {languageButton}
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
