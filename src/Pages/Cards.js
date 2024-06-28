import CharacterCard from '../Components/CharacterCard';

// React imports
import React, { useRef, useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { auth, db } from '../firebase.js';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

const Cards = () => {
    const [user, setUser] = useState({});
    const [authUser] = useAuthState(auth);

    useEffect(() => {
        if (authUser) {
            const docRef = doc(db, "users", 'user.' + authUser.email);
            const fetchData = async () => {
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUser(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            };
            fetchData();
        }
    }, [authUser]);

    const idList = user.characters || [];
    console.log(idList);
    const cards = idList.map((id) => {
        return <CharacterCard key={id} id={id}></CharacterCard>
    });

    //write useeffect code to automatically update cards when user changes
    useEffect(
        () => {
            console.log('UID:' + (authUser ? authUser.email : 'null'));
            console.log(idList)
        }
    );

    const handleClick = () => {
        console.log('UID:' + (authUser ? authUser.email : 'null'));
        console.log(idList)
    };

    return (
        <div>
            {cards}
            <button onClick={handleClick}>TEST USER</button>
        </div>
    );
}

export default Cards;
