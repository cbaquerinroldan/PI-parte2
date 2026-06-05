import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBOwBk895u37w6nLfW6-hfdbTCRna7kNQ4",
  authDomain: "rnfirebase1-66f46.firebaseapp.com",
  projectId: "rnfirebase1-66f46",
  storageBucket: "rnfirebase1-66f46.firebasestorage.app",
  messagingSenderId: "953474223063",
  appId: "1:953474223063:web:e757296071b2f64eebd992"
};
app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
