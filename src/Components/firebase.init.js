// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVeoIzCRlWaOWAF_ijbqvIslTZu5LR4oI",
  authDomain: "todo-application-34ded.firebaseapp.com",
  projectId: "todo-application-34ded",
  storageBucket: "todo-application-34ded.appspot.com",
  messagingSenderId: "742972063399",
  appId: "1:742972063399:web:a3eb5791708365ab182582"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;