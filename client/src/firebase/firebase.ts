import { initializeApp } from "firebase/app";
import { Auth, getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7H_Ged52aqpW0Ov9BEM4HYbW_mqYR75A",
  authDomain: "calendub-9909b.firebaseapp.com",
  projectId: "calendub-9909b",
  storageBucket: "calendub-9909b.firebasestorage.app",
  messagingSenderId: "445917115190",
  appId: "1:445917115190:web:1d7c9f58e75693fdb1f997",
  measurementId: "G-V7K4H9XHK7"
};

const app = initializeApp(firebaseConfig);
const auth : Auth = getAuth(app);
const provider : GoogleAuthProvider = new GoogleAuthProvider();

export { auth, provider };