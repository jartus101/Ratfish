import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp, setDoc, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import React, { useRef, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { auth } from '../firebase.js';

function SignIn() {
    const signInWithGoogle = () => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    }
  
    return (
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    );
  }
  
  function SignOut() {
    return auth.currentUser && (
      <button onClick={() => signOut(auth)}>Sign Out</button>
    );
  }

const Login = () => {
    const [user] = useAuthState(auth);

    return (
        <div>
            {user ? <SignOut /> : <SignIn />}
        </div>
    );
}

export default Login;