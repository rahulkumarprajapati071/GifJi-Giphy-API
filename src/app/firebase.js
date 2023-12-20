// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDorzxpNVxeP84F6Z8bImUwXDT15J2s1mQ",
  authDomain: "gifji-caeff.firebaseapp.com",
  projectId: "gifji-caeff",
  storageBucket: "gifji-caeff.appspot.com",
  messagingSenderId: "518752468640",
  appId: "1:518752468640:web:405444c66c4f6e274513c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();