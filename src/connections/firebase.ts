import firebaseadmin from "firebase-admin";
import { FirebaseApp, initializeApp } from 'firebase/app';

const firebaseJson = require("../config/firebase.json");  
const firebaseAppJson = require("../config/firebaseApp.json");  

let db : firebaseadmin.firestore.Firestore

export const connectFirebaseDb = () : firebaseadmin.firestore.Firestore => {
    
    if(!db){
        firebaseadmin.initializeApp({
            credential: firebaseadmin.credential.cert(firebaseJson)
        });

        db = firebaseadmin.firestore();
    }
    return db;
}

export const connectFirebaseAuth = () : FirebaseApp => {
    
    const app = initializeApp(firebaseAppJson);

    return app
}
