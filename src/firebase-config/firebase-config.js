// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_6-3NR7aPF5p0UG3j-YFuPs8AoHeWiaI",
  authDomain: "job-listing-8a84e.firebaseapp.com",
  projectId: "job-listing-8a84e",
  storageBucket: "job-listing-8a84e.appspot.com",
  messagingSenderId: "810578567590",
  appId: "1:810578567590:web:87fae719c55f9dedadef67"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const dbr = getDatabase(app);