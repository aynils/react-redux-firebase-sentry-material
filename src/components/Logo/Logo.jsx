import React from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/styles';
import logo from '../../assets/images/acme.svg';

const useStyles = makeStyles({
  imageIcon: {
    height: '100%',
  },
  iconRoot: {
    textAlign: 'center',
  },
});

export default function Logo() {
  const classes = useStyles();
  return (
    <Icon classes={{ root: classes.iconRoot }}>
      <img className={classes.imageIcon} src={logo} alt="logo" />
    </Icon>
  );
}
