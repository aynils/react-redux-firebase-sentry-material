import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import {Provider} from 'react-redux';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import {ReactReduxFirebaseProvider} from 'react-redux-firebase';
import {createFirestoreInstance} from 'redux-firestore';
import * as serviceWorker from './serviceWorker';
import store from './app/store';
import App from './App';
import initFirebase from './firebase';
import {reduxFirebase as rfConfig, sentryUrl} from './config/config';

import {spinner} from './components/Layout/Spinner/Spinner'

import {verifyAuth} from './components/Authentication/authenticationSlice';

// Translations
import './i18n';

initFirebase();

const environment = !!process.env.NODE_ENV ? process.env.NODE_ENV : 'production'

if (environment !== "development") {
    Sentry.init({
        dsn: sentryUrl,
        environment: environment

    });
}

store.dispatch(verifyAuth(firebase));

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ReactReduxFirebaseProvider
                    firebase={firebase}
                    config={rfConfig}
                    dispatch={store.dispatch}
                    createFirestoreInstance={createFirestoreInstance}
                >
                                        <Suspense fallback={spinner}>
                    <App/>
                                                                </Suspense>
                </ReactReduxFirebaseProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
