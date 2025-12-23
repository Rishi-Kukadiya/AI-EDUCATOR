import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API}`,
  authDomain: `${import.meta.env.VITE_FIREBASE_AUTHDOMAIN}`,
  projectId: `${import.meta.env.VITE_FIREBASE_PROJECTID}`,
  storageBucket: `${import.meta.env.VITE_FIREBASE_STORAGEBUCAKTE}`,
  messagingSenderId: `${import.meta.env.VITE_FIREBASE_MESSAGE}`,
  appId: `${import.meta.env.VITE_FIREBASE_APPID}`
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
