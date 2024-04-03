import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { firebaseApp, auth, firestore,collection,getDocs,query, where, storage } from './firebase/config'
import { FirebaseContext} from './store/Context';
import Context from './store/Context';


ReactDOM.render(
    <FirebaseContext.Provider value={{firebaseApp, auth, firestore, collection, getDocs,query, where, storage}}>
        <Context>
        <App />
        </Context>
    </FirebaseContext.Provider>
    , document.getElementById('root'));
