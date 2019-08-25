import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBLu8gMNWsABpdwKTRAqeXYlZvqZT-5py8",
    authDomain: "black-network-1355f.firebaseapp.com",
    databaseURL: "https://black-network-1355f.firebaseio.com",
    projectId: "black-network-1355f",
    storageBucket: "",
    messagingSenderId: "746606982395",
    appId: "1:746606982395:web:e121dd812e97fa90"
};

export const FirebaseImpl = firebase.initializeApp(config);
export const FirebaseDatabase = firebase.database();
export const FirebaseAuth = firebase.auth();
export const AuthGoogleProvider = new firebase.auth.GoogleAuthProvider();
