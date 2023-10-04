import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA8eLdC_a6C6eo7fZpIDDr2tmr13B0iTnY",
    authDomain: "surjapuri-shaadi.firebaseapp.com",
    projectId: "surjapuri-shaadi",
    storageBucket: "surjapuri-shaadi.appspot.com",
    messagingSenderId: "683651319204",
    appId: "1:683651319204:web:36b451ad29cfd2d6f1ad31",
    measurementId: "G-GZLWDK1GSH"
  };
  

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app);
export const db = getFirestore(app);