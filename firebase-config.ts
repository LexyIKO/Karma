import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAGMznea1ADjnf9PYS9L_PHMDi_q03WNTU",
    authDomain: "mykarma-6ec60.firebaseapp.com",  
    projectId: "mykarma-6ec60",
    storageBucket: "mykarma-6ec60.appspot.com",
    messagingSenderId: "320335125135",
    appId: "1:320335125135:web:d9cb93d9f2e55065cf6efa",
    measurementId: "G-79GV5DJTDK"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);