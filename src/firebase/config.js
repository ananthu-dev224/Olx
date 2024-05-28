
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { collection, getDocs,query, where , doc ,updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
 
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();
const storage = firebase.storage()

export { firebaseApp, auth, firestore, collection, getDocs, query, where, storage , doc ,updateDoc, arrayUnion, arrayRemove};