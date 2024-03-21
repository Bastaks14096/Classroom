// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsMeRAS9P8AK9NbHfyRzkfSfFzVsGu2e4",
  authDomain: "classroom-456cd.firebaseapp.com",
  databaseURL: "https://classroom-456cd-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "classroom-456cd",
  storageBucket: "classroom-456cd.appspot.com",
  messagingSenderId: "716575161448",
  appId: "1:716575161448:web:7a673024cd9d5376088fdd",
  measurementId: "G-59W1SQFJ42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}