import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import Layout from './components/Layout/Layout';
import './App.css';
import { hasAccountCheckState } from './components/Authentication/authenticationSlice';
import routes from './config/routes';
import theme from './theme';


function App() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);

  const dispatch = useDispatch();

  useEffect(() => dispatch(hasAccountCheckState()), [dispatch]);

  const withLayout = (Component, minimalLayout) => () => (
    <Layout minimal={minimalLayout}><Component /></Layout>
  );

  const defineRoute = (route) => {
    const Component = withLayout(route.component, route.minimalLayout);
    return (
      <Route
        path={route.path}
        component={Component}
        key={route.path}
      />
    );
  };

  const publicRoutes = (routes.public.map((route) => defineRoute(route)));

  const loginRoute = defineRoute(routes.authentication.login);

  const protectedRoutes = (routes.protected.map((route) => defineRoute(route)));

  const defaultRedirect = isLoggedIn ? routes.default.path : routes.authentication.login.path;

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        ...
        {publicRoutes}
        ...
        {isLoggedIn ? protectedRoutes : []}
        {loginRoute}
        <Redirect to={defaultRedirect} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
