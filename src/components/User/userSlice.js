import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: {},
        verificationEmailSent: false
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        removeProfile: (state) => {
            state.profile = {};
        },
        updateProfile: (state, action) => {
            state.profile = {...state.profile, ...action.payload};
        },
        setVerificationEmailSent: (state) => {
            state.verificationEmailSent = true;
        }
    },
});

export const {setProfile, removeProfile, updateProfile, setVerificationEmailSent} = userSlice.actions;

export const getUserProfile = (firebase) => (dispatch) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            if (user.uid) {
                firebase
                    .firestore()
                    .collection('userProfiles')
                    .where("userId", "==", user.uid)
                    .onSnapshot(docs => {
                        docs.forEach( doc =>
                            dispatch(setProfile(doc.data()))
                        )
                        ;
                    }, (error => console.log(error)));
            }
        } else {
            dispatch(removeProfile())
        }
    })
}

export const updateUserNickname = (firebase) => (dispatch) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            user.reload()
            dispatch(updateProfile({nickname: user.displayName}))
            firebase
                .firestore()
                .collection('userProfiles')
                .doc(user.uid)
                .update({nickname: user.displayName})
                .catch(error => console.log(error))
        } else {
            dispatch(removeProfile())
        }
    })
}

export const updateIsEmailVerified = (firebase) => (dispatch) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            if (!user.emailVerified) {
                user.reload()
            }
            if (user.emailVerified) {
                dispatch(updateProfile({isEmailVerified: user.emailVerified}))
                firebase
                    .firestore()
                    .collection('userProfiles')
                    .doc(user.uid)
                    .update({isEmailVerified: user.emailVerified})
                    .catch(error => console.error(error))
            }
        } else {
            dispatch(removeProfile())
        }
    })
}

export const sendVerificationEmail = (firebase) => (dispatch) => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            if (!user.emailVerified) {
                user.reload()
            }
            if (!user.emailVerified) {
                dispatch(setVerificationEmailSent())
                user.sendEmailVerification()
            }
        } else {
            dispatch(removeProfile())
        }
    })
}

export default userSlice.reducer;
