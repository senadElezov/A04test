// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3PwVIMT8RkgoUnoGkiaD8UswAsy_UV48",
    authDomain: "a04test-95949.firebaseapp.com",
    projectId: "a04test-95949",
    storageBucket: "a04test-95949.appspot.com",
    messagingSenderId: "375933724774",
    appId: "1:375933724774:web:0f0bf80b5a3cc8c517e5a7",
    measurementId: "G-4FVZ0W7009"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const database = getFirestore(firebaseApp);
