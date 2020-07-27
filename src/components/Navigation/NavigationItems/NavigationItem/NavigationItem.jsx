import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, ListItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {},
    item: {
        display: 'flex',
        paddingTop: 0,
        paddingBottom: 0
    },
    button: {
        padding: '10px 8px',
        justifyContent: 'flex-start',
        textTransform: 'none',
        letterSpacing: 0,
        width: '100%',
        fontWeight: theme.typography.fontWeightMedium
    },
    icon: {
        color: theme.palette.icon,
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(1)
    },
    active: {
        color: theme.palette.primary.main,
        fontWeight: theme.typography.fontWeightMedium,
        '& $icon': {
            color: theme.palette.primary.main
        }
    }
}));


const NavigationItem = (props) => {
  const classes = useStyles();
  return (

    <ListItem
      className={classes.item}
      disableGutters
      key={props.link}
    >
      <Button className={classes.button} color="inherit" component={NavLink} to={props.link}>
        {/* <div className={classes.icon}>{props.icon}</div> */}
        {props.children}
      </Button>
    </ListItem>

  );
};

export default NavigationItem;
