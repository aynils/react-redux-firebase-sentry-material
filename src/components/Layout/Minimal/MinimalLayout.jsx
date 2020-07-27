import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React from 'react';
import TopMenu from '../TopMenu/TopMenu';


const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%',
  },
  content: {
    height: '100%',
  },
}));

export default function MinimalLayout({ children, className }) {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.root)}>
      <TopMenu minimalLayout />
      <main className={clsx(className, classes.content)}>{children}</main>
    </div>
  );
}
