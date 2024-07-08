import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyAk7KeQ5GsKWCUkAwHSVEyOMu9odCmadYc",
  authDomain: "ai-gemini-e5c32.firebaseapp.com",
  projectId: "ai-gemini-e5c32",
  storageBucket: "ai-gemini-e5c32.appspot.com",
  messagingSenderId: "947686248807",
  appId: "1:947686248807:web:68e212aa72412a3690dfc2",
  measurementId: "G-QNED5GW8GJ",
};

// Initialize Firebase
const appFirebase = firebase.initializeApp(firebaseConfig);
export const database = getAuth(appFirebase);
export default appFirebase;
