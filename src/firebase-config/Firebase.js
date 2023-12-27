// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0zBbrkZ0nz8C-9TrRSRK_sLQBWb3OimA",
  authDomain: "mad-proj-9cef2.firebaseapp.com",
  projectId: "mad-proj-9cef2",
  storageBucket: "mad-proj-9cef2.appspot.com",
  messagingSenderId: "92788348285",
  appId: "1:92788348285:web:ece5bfe131ce3cc3f96814",
  measurementId: "G-3Q1547GGM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Database = getFirestore(app);

export {Auth, Database};