// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYn-L7Gm5cdJYLPJK-CQHCHf7dbSOwVss",
    authDomain: "datn-p1.firebaseapp.com",
    projectId: "datn-p1",
    storageBucket: "datn-p1.appspot.com",
    messagingSenderId: "762005473119",
    appId: "1:762005473119:web:6e11361894cfe84f9b58ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
