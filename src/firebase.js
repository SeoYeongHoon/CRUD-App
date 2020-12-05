import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyDnRtJ95m5dQQYzqjFoy0w21Zq2-tSlPcU",
    authDomain: "react-crud-c39fc.firebaseapp.com",
    databaseURL: "https://react-crud-c39fc.firebaseio.com",
    projectId: "react-crud-c39fc",
    storageBucket: "react-crud-c39fc.appspot.com",
    messagingSenderId: "780538238955",
    appId: "1:780538238955:web:0276af40593f1634f6ebae"
};
  // Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();