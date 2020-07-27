import React, { useState } from 'react';
import clsx from 'clsx';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Sidebar from '../../Navigation/SideBar/SideBar';
import TopMenu from '../TopMenu/TopMenu';
import Banner from '../Feedback/Banner/Banner'

const useStyles = makeStyles((theme) => ({

  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
  },
}));

export default function MainLayout({ children }) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >

      <TopMenu onSidebarOpen={handleSidebarOpen} minimalLayout={false} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />

      <main className={classes.content}><Banner/>{children}</main>

    </div>
  );
}

MainLayout.defaultProps = {
  children: {},
};
MainLayout.propTypes = {
  children: PropTypes.node,
};
