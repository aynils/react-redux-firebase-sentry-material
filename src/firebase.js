import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
import { firebase as firebaseConfig } from './config/config';

let firebaseInstance;

export default function initFirebase() {
  if (firebaseInstance) {
    return firebaseInstance;
  }

  // Initialize firebase instance if it doesn't already exist
  if (!firebaseInstance) {
    const shouldUseEmulator = process.env.REACT_APP_USE_DB_EMULATORS;

    if (shouldUseEmulator) {
      // or window.location.hostname === 'localhost' if you want
      firebaseConfig.databaseURL = `http://localhost:9000?ns=${firebaseConfig.projectId}`;
    }

    // Initialize Firebase instance
    firebase.initializeApp(firebaseConfig);

    if (shouldUseEmulator) {
      // or window.location.hostname === 'localhost' if you want
      firebase.firestore()
        .settings({
          host: 'localhost:8080',
          ssl: false,
        });
    }
    firebaseInstance = firebase;
  }

  return firebaseInstance;
}
