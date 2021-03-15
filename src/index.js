import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { firebase } from "@firebase/app";
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyAja6ksUMffrx9YEEsJFETzQpRxGxtq7-w",
  authDomain: "find-waldo-245cb.firebaseapp.com",
  projectId: "find-waldo-245cb",
  storageBucket: "find-waldo-245cb.appspot.com",
  messagingSenderId: "129714425454",
  appId: "1:129714425454:web:ed1685dbb7e3b65dcda07f",
  measurementId: "G-Z51LKDCW8W",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
