import React from 'react';
import {useSelector} from 'react-redux';
import {List} from '@material-ui/core';
import NavigationItem from './NavigationItem/NavigationItem';
import routes from '../../../config/routes';
import {useTranslation} from 'react-i18next';

const NavigationItems = () => {
    const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
    const protectedRoutes = isLoggedIn ? routes.protected : [];
    const allRoutes = [...protectedRoutes, ...routes.public];
    const {t} = useTranslation('common', {useSuspense: false});

    return (
        <List>
            {allRoutes.map((route) => {
                return route.inNav && <NavigationItem
                    key={route.path}
                    link={route.path}>
                    {t(`navbar.${route.name}`)}
                </NavigationItem>

            })}
        </List>

    );
};

export default NavigationItems;
