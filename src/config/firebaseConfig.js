// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVIIeb_rm2p06M1J-v1C6ufYnysuR9y94",
  authDomain: "login-f890a.firebaseapp.com",
  projectId: "login-f890a",
  storageBucket: "login-f890a.appspot.com",
  messagingSenderId: "615802039610",
  appId: "1:615802039610:web:69998f1acc3c0da81ab403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };