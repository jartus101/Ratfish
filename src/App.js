// Firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// React imports
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component imports
import ChatBubble from './Components/ChatBubble';
import ChatRoom from './Pages/ChatRoom';
import CharacterCreator from './Pages/CharacterCreator';
import CharacterCard from './Components/CharacterCard'
import Navbar from './Components/Navbar';
import Cards from './Pages/Cards'
import Login from './Pages/Login'

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

function App() {
  return (
    <div className="App">
      {auth.currentUser
        ? <Login></Login>
        :<section>
          <Router>
              <Navbar />
              <Routes>
                  <Route exact path="/" element={<ChatRoom />} />
                  <Route path="/CharacterCreator" element={<CharacterCreator />} />
                  <Route path="/Cards" element={<Cards />} />
                  <Route path="/ChatRoom" element={<ChatRoom />} />
                  <Route path="/Login" element={<Login />} />
              </Routes>
          </Router>
        </section>}
    </div>
  );
}

export default App;
