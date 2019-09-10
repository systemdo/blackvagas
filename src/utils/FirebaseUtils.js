import firebase from 'firebase';

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export const FirebaseImpl = firebase.initializeApp(config);
export const FirebaseDatabase = firebase.database();
export const FirebaseAuth = firebase.auth();
export const AuthGoogleProvider = new firebase.auth.GoogleAuthProvider();
