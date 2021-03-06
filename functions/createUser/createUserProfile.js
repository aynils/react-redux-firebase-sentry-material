const firebase = require('firebase-admin')
const functions = require('firebase-functions');

firebase.initializeApp()

DEFAULT_STARTING_USER_CREDITS = 10


exports.createUserProfile = functions.auth.user().onCreate((user) => {
    firebase
        .firestore()
        .collection('userProfiles')
        .doc(user.uid)
        .set({
            email: user.email,
            userId: user.uid,
        })
        .then(() => console.log('createUserProfile DONE'))
        .catch((error) => console.error(error))
})


