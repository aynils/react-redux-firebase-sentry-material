import React from 'react';
import { useSelector } from 'react-redux';
import { List } from '@material-ui/core';
import NavigationItem from './NavigationItem/NavigationItem';
import routes from '../../../config/routes';


const NavigationItems = () => {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const protectedRoutes = isLoggedIn ? routes.protected : [];

  const allRoutes = [...protectedRoutes, ...routes.public];

  return (
    <List>
      {allRoutes.map((route) => (
        <NavigationItem key={route.path} link={route.path}>{route.name}</NavigationItem>
      ))}
    </List>

  );
};

export default NavigationItems;
