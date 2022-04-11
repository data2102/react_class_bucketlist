import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
        apiKey: "AIzaSyAe090GeyiFZB5aBBVWWyGSbG8BS9Q3w9E",
        authDomain: "sparta-react-8edce.firebaseapp.com",
        projectId: "sparta-react-8edce",
        storageBucket: "sparta-react-8edce.appspot.com",
        messagingSenderId: "649154605802",
        appId: "1:649154605802:web:5000c779edf99024725d93",
        measurementId: "G-71DCJ0L563"
    };

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();

export { firestore };