// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmoow9JBlaP1IQXfMf2cTe2ZFCMHUACEs",
  authDomain: "vite-contact-1f0ff.firebaseapp.com",
  projectId: "vite-contact-1f0ff",
  storageBucket: "vite-contact-1f0ff.appspot.com",
  messagingSenderId: "590642727537",
  appId: "1:590642727537:web:3a37776685c14efaa869d0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);