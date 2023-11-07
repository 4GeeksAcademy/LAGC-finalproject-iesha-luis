import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
// import Footer from "./component/Footer";

const firebaseConfig = {
  apiKey: "AIzaSyDJSMD3b_gldBtrYAZDPzgsuxghtjKGjPA",
  authDomain: "voyage-hawk.firebaseapp.com",
  projectId: "voyage-hawk",
  storageBucket: "voyage-hawk.appspot.com",
  messagingSenderId: "1024774339212",
  appId: "1:1024774339212:web:9a7fcfc5da537d974699a9",
  measurementId: "G-R9MJG8PNCK"
};


const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);
connectAuthEmulator(auth, process.env.REACT_APP_FIREBASE_AUTH_HOST);
connectFirestoreEmulator(
  firestore,
  process.env.REACT_APP_FIREBASE_FIRESTORE_HOST
);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
