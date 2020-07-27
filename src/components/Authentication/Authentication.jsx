import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Signin from './SignIn/Signin';


export default function Authentication() {
  const isLoggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const authRedirectPath = useSelector(
    (state) => state.authentication.authRedirectPath,
  );
  if (isLoggedIn) {
    return <Redirect to={authRedirectPath} />;
  }
  return (<Signin />);
}
