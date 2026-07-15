// 1. Importações do SDK de ADMIN (para o banco Firestore)
import { initializeApp as initializeAdminApp, cert, getApps as getAdminApps, getApp as getAdminApp } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

// 2. Importações do SDK de CLIENT (para o fluxo de login do Auth no backend)
import { initializeApp as initializeClientApp, getApps as getClientApps, getApp as getClientApp, FirebaseApp } from 'firebase/app';

let db: Firestore;

/**
 * Inicializa o Firebase ADMIN SDK e retorna a instância do Firestore.
 */
export const connectFirebaseDb = (): Firestore => {
  const env = process.env.NODE_ENVIRONMENT || "";

  if (!db) {
    const adminApp = getAdminApps().length === 0 
      ? initializeAdminApp({
          credential: cert({
            projectId: process.env[`FIREBASE${env}_PROJECT_ID`],
            privateKey: process.env[`FIREBASE${env}_DB_PRIVATE_KEY`]?.replace(/\\n/g, '\n'),
            clientEmail: process.env[`FIREBASE${env}_DB_CLIENT_EMAIL`],
          } as any)
        })
      : getAdminApp();

    db = getFirestore(adminApp);
  }
  return db;
};

/**
 * Inicializa o Firebase CLIENT SDK e retorna o app compatível com 'firebase/auth'.
 */
export const connectFirebaseAuth = (): FirebaseApp => {
  const env = process.env.NODE_ENVIRONMENT || "";

  // Evita o erro de inicializar o app de cliente mais de uma vez
  const clientApp = getClientApps().length === 0
    ? initializeClientApp({
        apiKey: process.env[`FIREBASE${env}_API_KEY`],
        authDomain: process.env[`FIREBASE${env}_AUTH_DOMAIN`],
        projectId: process.env[`FIREBASE${env}_PROJECT_ID`],
        storageBucket: process.env[`FIREBASE${env}_STORAGE_BUCKET`],
        messagingSenderId: process.env[`FIREBASE${env}_MESSAGING_SENDER_ID`],
        appId: process.env[`FIREBASE${env}_APP_ID`]
      })
    : getClientApp();

  return clientApp;
};