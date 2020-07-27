import { createSlice } from '@reduxjs/toolkit';

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    hasAccount: false,
    token: null,
    error: null,
    userId: null,
    loading: false,
    authRedirectPath: '/',
    isLoggedIn: false,
  },
  reducers: {
    authStart: (state) => {
      state.loading = true;
    },
    authSuccess: (state) => {
      state.error = null;
      state.loading = false;
    },
    authFail: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    setHasAccount: (state, action) => {
      state.hasAccount = action.payload;
      localStorage.setItem('hasAccount', action.payload);
    },

    setAuthRedirectPath: (state, action) => {
      state.authRedirectPath = action.path;
    },

    authUser: (state) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.hasAccount = true;
    },
    signOutUser: (state) => {
      state.isLoggedIn = false;
      state.loading = false;
    },
  },
});

export const {
  authStart,
  authSuccess,
  authFail,
  setAuthRedirectPath,
  setHasAccount,
  authUser,
  signOutUser,
} = authenticationSlice.actions;

export const verifyAuth = (firebase) => (dispatch) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      dispatch(authUser());
    } else {
      dispatch(signOutUser());
    }
  });
};

export const hasAccountCheckState = () => (dispatch) => {
  const hasAccount = localStorage.getItem('hasAccount');
  dispatch(setHasAccount(hasAccount === 'true'));
};

export const logout = (firebase) => {
  return (dispatch) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(signOutUser());
      }).catch((error) => console.log(error));
  };
};

export default authenticationSlice.reducer;
