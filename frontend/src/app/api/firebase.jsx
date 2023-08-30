// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpN6wwyz3HHzM1kOod52gduVwftZjE-5Q",
  authDomain: "build-27f66.firebaseapp.com",
  projectId: "build-27f66",
  storageBucket: "build-27f66.appspot.com",
  messagingSenderId: "159797301319",
  appId: "1:159797301319:web:4cd1621358309043e12162"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);