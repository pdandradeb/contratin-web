/* eslint-env node */

import { initializeApp, FirebaseApp } from "firebase/app";
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";

// npx env-cmd npx ts-node --esm ./view-templates.ts

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

async function main() {
  initializeApp(firebaseConfig);
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const db: Firestore = getFirestore(app);
  console.log("Removendo templates antigos...");
  const templatesRef = collection(db, "templates");
  const templatesQuery = query(templatesRef);
  const templatesSnapshot = await getDocs(templatesQuery);
  templatesSnapshot.forEach((doc) => console.log(doc.data()));
  process.exit(0);
}

main();
