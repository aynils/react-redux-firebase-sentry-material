import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import {firebaseReducer} from 'react-redux-firebase';
import authenticationReducer from '../components/Authentication/authenticationSlice.js';
import templateReducer from '../components/Template/templateSlice.js';
import feedbackReducer from '../components/Layout/Feedback/feedbackSlice.js';
import userReducer from '../components/User/userSlice.js';

// Every reducer must be included here to be accessible by the useSelector hook
const store = configureStore({
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        authentication: authenticationReducer,
        template: templateReducer,
        firebase: firebaseReducer,
        feedback: feedbackReducer,
        user: userReducer
    },
});

export default store;

