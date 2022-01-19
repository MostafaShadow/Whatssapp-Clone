import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVz_Br8BkO--etCHvKD0pZh8lz3UqApiU",
  authDomain: "whatsapp-36630.firebaseapp.com",
  projectId: "whatsapp-36630",
  storageBucket: "whatsapp-36630.appspot.com",
  messagingSenderId: "874388442923",
  appId: "1:874388442923:web:714d42c2edfb722c463f6e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export default app;

export { db, auth, provider };
