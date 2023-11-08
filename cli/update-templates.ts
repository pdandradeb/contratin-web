/* eslint-env node */

import { initializeApp, FirebaseApp } from "firebase/app";
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
} from "firebase/firestore";
import templates from "./data/templates/index.json" assert { type: "json" };
import fs from "fs";
import path from "path";

// npx env-cmd npx ts-node --esm ./update-templates.ts

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
  await Promise.all(templatesSnapshot.docs.map((doc) => deleteDoc(doc.ref)));
  console.log("Adicionando templates...");
  await Promise.all(
    templates.map((template) => {
      const text = fs
        .readFileSync(path.join("data", "templates", template.file))
        .toString();
      const contractDocRef = doc(templatesRef, template.id);
      return setDoc(contractDocRef, {
        template: text,
        name: template.name,
      });
    })
  );
  process.exit(0);
}

main();
