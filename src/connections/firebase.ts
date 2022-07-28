import firebaseadmin from "firebase-admin";
import { FirebaseApp, initializeApp } from 'firebase/app';

let db : firebaseadmin.firestore.Firestore

export const connectFirebaseDb = () : firebaseadmin.firestore.Firestore => {
    
    if(!db){
        firebaseadmin.initializeApp({
            credential: firebaseadmin.credential.cert({
                api_key : process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_API_KEY`],
                type: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_TYPE`],
                project_id: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_PROJECT_ID`],
                private_key_id: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_PRIVATE_KEY_ID`],
                private_key: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_PRIVATE_KEY`],
                client_email: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_CLIENT_EMAIL`],
                client_id: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_CLIENT_ID`],
                auth_uri: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_AUTH_URI`],
                token_uri: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_TOKEN_URI`],
                auth_provider_x509_cert_url: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_AUTH_PROVIDER_X509_CERT_URL`],
                client_x509_cert_url: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_DB_CLIENT_X509_CERT_URL`]
            } as any)
        });

        db = firebaseadmin.firestore();
    }
    return db;
}

export const connectFirebaseAuth = () : FirebaseApp => {
    
    const app = initializeApp({
        apiKey: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_API_KEY`],
        authDomain: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_AUTH_DOMAIN`],
        projectId: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_PROJECT_ID`],
        storageBucket: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_STORAGE_BUCKET`],
        messagingSenderId: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_MESSAGING_SENDER_ID`],
        appId: process.env[`FIREBASE${process.env.NODE_ENVIRONMENT}_APP_ID`]
    });

    return app
}
