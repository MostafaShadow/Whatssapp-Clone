import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQB9L1IibNv7zbnyWwC-X8stJfEPrTTkg",
  authDomain: "whatssappclone-ac228.firebaseapp.com",
  projectId: "whatssappclone-ac228",
  storageBucket: "whatssappclone-ac228.appspot.com",
  messagingSenderId: "1006125739297",
  appId: "1:1006125739297:web:ba93e45b215176b2e76260",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export default app;

export { db, auth, provider };
