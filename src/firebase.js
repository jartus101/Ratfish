import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAexQxXFSAct1NQ8Gq0VBhvTo2Br2FjOhE",
  authDomain: "ratfish-f032a.firebaseapp.com",
  projectId: "ratfish-f032a",
  storageBucket: "ratfish-f032a.appspot.com",
  messagingSenderId: "447596231616",
  appId: "1:447596231616:web:bd6cfdfbd1000d58daa625",
  measurementId: "G-2Y899MV5JJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, firestore, analytics, storage, db }; 