import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyAbHMHOcbXNgEhnmP1mp9bFLuWQyt4FKp4",
    authDomain: "to-do-list-c00d7.firebaseapp.com",
    projectId: "to-do-list-c00d7",
    storageBucket: "to-do-list-c00d7.appspot.com",
    messagingSenderId: "1088173831169",
    appId: "1:1088173831169:web:56e4effda4dfcb33f7bc00",
    measurementId: "G-DFX95CT9YE"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore()

export default firebaseConfig