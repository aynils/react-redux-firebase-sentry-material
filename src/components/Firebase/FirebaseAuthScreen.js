import React from 'react';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { useFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // firebaseInstance.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebaseInstance.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebaseInstance.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebaseInstance.auth.PhoneAuthProvider.PROVIDER_ID,
  ],
};

export const FirebaseAuthScreen = () => {
  const firebase = useFirebase();
  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  );
};
