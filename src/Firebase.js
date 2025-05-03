/* 
Tondo's Firebase/Firestore Backend connection

Authored: David Kipnis, 2025
*/

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDKHP_Nw828U0ub2LWl69l62GogHZ7Efmg",
    authDomain: "tondo-83b67.firebaseapp.com",
    projectId: "tondo-83b67",
    storageBucket: "tondo-83b67.firebasestorage.app",
    messagingSenderId: "1027399791856",
    appId: "1:1027399791856:web:292ebdb96c8c4ae202fe35",
    measurementId: "G-726YM4JD2T"
  };

  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);
  export const db = getFirestore(app);