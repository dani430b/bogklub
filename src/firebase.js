import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAdzJUH7gDC505qJoD2XlUna6QnGSinPh4",
  authDomain: "dragdropdb.firebaseapp.com",
  projectId: "dragdropdb",
  storageBucket: "dragdropdb.appspot.com",
  messagingSenderId: "316157142104",
  appId: "1:316157142104:web:d5eb6a2057cae1e2b1962d",
  measurementId: "G-PT5RBWZXYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
