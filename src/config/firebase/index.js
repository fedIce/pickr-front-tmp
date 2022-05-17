import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/auth';

const firestorePersistance = () => {
    firebase.firestore().enablePersistence()
        .catch((err) => {
            console.log(err)
            if (err.code == 'failed-precondition') {
                // Multiple tabs open, persistence can only be enabled
                // in one tab at a a time.
                // ...
            } else if (err.code == 'unimplemented') {
                // The current browser does not support all of the
                // features required to enable persistence
                // ...
            }
        });
    // Subsequent queries will use persistence, if it was enabled successfully
}

// Initialize Firebase
const config = {
    apiKey: "AIzaSyCbw68rsFgybxtKCeutCrBNW9tCiEHXKCw",
    authDomain: "package-fairy-291708.firebaseapp.com",
    databaseURL: "https://package-fairy-291708.firebaseio.com",
    projectId: "package-fairy-291708",
    storageBucket: "package-fairy-291708.appspot.com",
    messagingSenderId: "485375167761",
    appId: "1:485375167761:web:91f22619dd98131d1c90b0",
    measurementId: "G-3VB6P1R715"
};

firebase.initializeApp(config);
firebase.firestore();
firestorePersistance()



export const database = firebase.database();
export const auth = firebase.auth();
export const uid = async () => {return await firebase.auth().currentUser.uid}
// export const provider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
export default firebase