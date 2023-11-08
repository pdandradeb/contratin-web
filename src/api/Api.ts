import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import { documentAs, documentsAs, initializeFirebase } from "./firebase";
import { getApp } from "firebase/app";

export default class Api {
  constructor() {
    initializeFirebase();
  }
  async fetchTemplates() {
    const snapshot = await getDocs(
      query(collection(getFirestore(), "templates"))
    );
    return documentsAs<Template>(snapshot.docs);
  }

  async fetchTemplate(id: string) {
    const snapshot = await getDoc(
      doc(collection(getFirestore(), "templates"), id)
    );
    if (!snapshot.exists) return null;
    return documentAs<Template>(snapshot);
  }
}

export const api = new Api();
