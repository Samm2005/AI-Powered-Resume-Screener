// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBP2e2tgR-barr34jaZC1677FL8rUOSt3Y",
    authDomain: "userdata-f1f99.firebaseapp.com",
    projectId: "userdata-f1f99",
    storageBucket: "userdata-f1f99.appspot.com",
    messagingSenderId: "275384742100",
    appId: "1:275384742100:web:e86c5d699bbc67b4d74b41",
    measurementId: "G-LKPG9G3726"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
