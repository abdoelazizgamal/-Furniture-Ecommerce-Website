// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQJZ1neSSf8oL3AMtpFwjBb7tfen5_--g",
  authDomain: "maltimart-51727.firebaseapp.com",
  projectId: "maltimart-51727",
  storageBucket: "maltimart-51727.appspot.com",
  messagingSenderId: "88690405567",
  appId: "1:88690405567:web:283b81b48c807b98cd160a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);