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

import { app, auth, firestore, analytics } from './firebase.js';

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
