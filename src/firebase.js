// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuegs0-sF2K31MudFMtNHxRDWnmFM3Ysk",
  authDomain: "meeting-management-5edc8.firebaseapp.com",
  projectId: "meeting-management-5edc8",
  storageBucket: "meeting-management-5edc8.firebasestorage.app",
  messagingSenderId: "322182628163",
  appId: "1:322182628163:web:934830de9e1684d348a5f6",
  measurementId: "G-1P5W70BSCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
