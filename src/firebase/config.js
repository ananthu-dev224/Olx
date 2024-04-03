
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import { collection, getDocs,query, where } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfA9P-4k6y8wu32m9-v-VxcOCxAwYJ4_I",
  authDomain: "olx-clone-14058.firebaseapp.com",
  projectId: "olx-clone-14058",
  storageBucket: "olx-clone-14058.appspot.com",
  messagingSenderId: "67528235556",
  appId: "1:67528235556:web:39f2cf27ca4038530896b1"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();
const storage = firebase.storage()

export { firebaseApp, auth, firestore, collection, getDocs, query, where, storage };