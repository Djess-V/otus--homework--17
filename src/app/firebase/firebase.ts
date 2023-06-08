import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const config = {
  apiKey: "AIzaSyBqURuv9mA7QCri_96ATJQUaBkDtn2vBxQ",
  authDomain: "my-chat-67cbb.firebaseapp.com",
  projectId: "my-chat-67cbb",
  storageBucket: "my-chat-67cbb.appspot.com",
  messagingSenderId: "166026901535",
  appId: "1:166026901535:web:4dfc3aecb7e020a3f33d2a",
  measurementId: "G-07FEL2DFJM",
  databaseURL:
    "https://my-chat-67cbb-default-rtdb.europe-west1.firebasedatabase.app",
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleAuthProvider = new GoogleAuthProvider();
