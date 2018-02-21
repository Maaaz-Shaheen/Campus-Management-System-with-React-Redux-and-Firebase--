import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD9wZ4S7Oxf79jpzD1IR-6EIgZs5gUHn4k",
    authDomain: "campus-recruitment-syste-2fdc9.firebaseapp.com",
    databaseURL: "https://campus-recruitment-syste-2fdc9.firebaseio.com",
    projectId: "campus-recruitment-syste-2fdc9",
    storageBucket: "campus-recruitment-syste-2fdc9.appspot.com",
    messagingSenderId: "1074004245323"
};

firebase.initializeApp(config);

const database = firebase.database();

export { firebase, database as default };