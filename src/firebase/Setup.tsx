// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2ehljnSmJ10FGE-_5fNp3-djL-gN3XBw",
  authDomain: "weedinginvitations.firebaseapp.com",
  projectId: "weedinginvitations",
  storageBucket: "weedinginvitations.appspot.com",
  messagingSenderId: "849050167002",
  appId: "1:849050167002:web:a0394e3bef716d241567e3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestoreDb = getFirestore(app);

//export const messaging = getMessaging(app);