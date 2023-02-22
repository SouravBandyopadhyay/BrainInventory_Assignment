// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAo7b90-zLmPdofdRvhanos0wiziphEPTE",
  authDomain: "fir-chat-app-45175.firebaseapp.com",
  projectId: "fir-chat-app-45175",
  storageBucket: "fir-chat-app-45175.appspot.com",
  messagingSenderId: "1028297750141",
  appId: "1:1028297750141:web:654c6e3bbcca9cf18d6314",
  measurementId: "G-JJC07L17XD",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
