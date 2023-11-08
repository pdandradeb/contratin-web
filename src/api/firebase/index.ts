import { initializeApp, getApps } from "firebase/app";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const initializeFirebase = () => {
  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
};

import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";

export type FirebaseError = {
  code: string;
  message: string;
};

export type FirebaseDocument =
  | QueryDocumentSnapshot<DocumentData>
  | DocumentSnapshot<DocumentData>;

export type WithId<T extends object> = T & {
  id: string;
};

export const documentAs = <T extends object>(
  doc: FirebaseDocument
): WithId<T> => ({
  ...(doc.data() as T),
  id: doc.id,
});

export const documentsAs = <T extends object>(
  docs: FirebaseDocument[]
): WithId<T>[] => docs.map((doc) => documentAs<T>(doc));
