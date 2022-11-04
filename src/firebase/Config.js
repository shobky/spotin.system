import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGEIN_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
    // apiKey: "AIzaSyBi4kWdnho_akhsGy6eTsdrnUxTfgunjEg",
    // authDomain: "spotin-89dc7.firebaseapp.com",
    // projectId: "spotin-89dc7",
    // storageBucket: "spotin-89dc7.appspot.com",
    // messagingSenderId: "1018756435619",
    // appId: "1:1018756435619:web:38608da636fdbb2261b916",
    // measurementId: "G-W1QV69FBYY"
}

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth();
export const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => signInWithRedirect(auth, provider);