import React, { useState, useEffect } from 'react';
import { getDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase.js';
import './CharacterCard.css';
import Cards from '../Pages/Cards'

const CharacterCard = ({ id, onRemove }) => {
    const docRef = doc(db, "characters", id);
    const [character, setCharacter] = useState({});
    const [user, setUser] = useState({});
    const [authUser] = useAuthState(auth);

    useEffect(() => {
        const fetchCharacter = async () => {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setCharacter(docSnap.data());
            }
        };
        fetchCharacter();
    }, [docRef]);

    useEffect(() => {
        if (authUser) {
            const userRef = doc(db, "users", 'user.' + authUser.email);
            const fetchUser = async () => {
                const docSnap = await getDoc(userRef);
                if (docSnap.exists()) {
                    setUser(docSnap.data());
                }
            };
            fetchUser();
        }
    }, [authUser]);

    const removeCharacter = async () => {
        if (user.characters) {
            const updatedCharacters = user.characters.filter(characterId => characterId !== id);
            await setDoc(doc(db, "users", 'user.' + authUser.email), { characters: updatedCharacters }, { merge: true });
            await deleteDoc(doc(db, "characters", id));
        }
    };

    const selectCharacter = async () => {
        await setDoc(doc(db, "users", 'user.' + authUser.email), { selectedCharacter: id }, { merge: true });
    };

    return (
        <div className='characterCard'>
            <h2 style={{color: 'white'}} className='name'>{character.name}</h2>
            <hr></hr>    
            <div>
                {character.image!=='' ? <img className='pfp' src={character.image} alt='character' /> : <img className='pfp' src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAhFBMVEX///8AAADV1dXt7e309PRdXV3Ozs76+vqtra3f39/ExMTq6urAwMD39/fa2trJycl8fHwxMTFvb2+ampqIiIhNTU08PDxTU1MNDQ2UlJSmpqavr69YWFiHh4fl5eVGRkYrKyt+fn5kZGQ4ODgUFBQhISEaGhoiIiKfn5+3t7dtbW1BQUGpfRFFAAAFeElEQVR4nO2di0IaMRBFWVhYBHmjPF0FsSr+//9VUCzQVu4kmUymnfMBJLduJvNMKxXDMAzDMAzDMNSTl73mqL+e3D5nv5g+vC3X/VGzddWW3p8PRXdxN5lmlxgMZy2FOvPW+O2itmMms14uvWmc6mxAUnfgcdaQ3jpCo3/5w/yG4bW0gO8pxz7qDiLT/Ute3wfQt+PppSOt5U/Mvb7Oc/qltJ5zXkLK27O+ktZ0zCK4vh3DmrSuAw23ywFgJi1tT2fIpe+dTUtaXqXyyqhvx7YQFrhmFviO6PVY5deXiZ7GeRSB72651JfKaWJOmYqEV0UoHw2iGl9g/hRTYJb1Ygtsx9UXX2IZXWDkW6MmIDDLIrri+UZEYRYvk/MgIzAbxBK4FBL4HhfHEXgnJjDLXmMIvBYUGOUoypjRL+r8Cmmp7PCw51NHwgKzDbNACV/mjBGvwqjxxF9gDRbds4ZPy1mz0S3zTpHXym6vOas7uw2sIb/jnravf4pg89bdD6efYxToVHepf5cQ7Lr8ZJNNoMtVuLqYf2iSf5PPPV2R94Ll5ck3UJdJYE7dyADdSZtooldMCqlHZsz220y3fkEUSMur0O4hnswbzSKQM5yk+gfPlUi6oQf0MjUlgc5iTUklioGLZ9UnLMBR56esv3HbAOEr4UieEgRmjl0GXXwFhgCjRxDoXLfFvxOGUJ9QZ3K/j3G38CGYsC9wgT88VsH/HYObGoIl9TEC+DLBM/wzeOmJ1zpwwBi8R+MWVujn98P+6SKQsC9ggUu/dWCTHdpva8AKPYt8HXSd0AEUHKM++a6E+jWhazRwtcn740FX2oaQdQRs4ryNOOrWeJ73c2Bfwz/4Rs+D36X0G7CF8z//aJR4E0CWw7IBCpjoUoH/hitUoX9zFqpwHUDWEXCyz38pVOHQf6lTirxdXnUbrdfF/GU07m/rk5u3wW8W9s1/IdTSROpZqBRFUSu7jV7rejEfjVcv/r+I3haUZGxaTECFfNUZbtCxlAQ63N2AWx6TGjehAGe+kxyMQtiCAqN1uIUGrv4Evw5jAX+kc+mdugKng7QaGjxZIr1TV2D/V+sxxPs6Ex+H/iuwQN7GLz7wypPSj5TQe5zuOPt3EIZwnqX36kRBaOLTGTnhpR+llyEa+O5Q6bFRZlSm0pt1gTSEE2WoJDA3FIH30rul06G9yKDvwaU2bdJPn5nBA6Y9EYaCAkOc6N+oc7mpE/3JPctzgRrFkdmhLQ1MaQbco83KkGdJ0niOByYnz4jdSW+ZBn3UVplA+qsouuqFVfrLbsxjlYHBOzm/UBXV002MwMstPhD90D2qihQOo+C3il5uxQugR6jK/naofmimzMaU9EtiwzUtygJh5ufAUlU4SI4ktMUSLbK+Z1WXhIPAWK15gaDf88qqvGQjc5/M+7oY5Pf5lEXzpNLgjqnAK5B+kMoSwTu4I0B8/Cz4UBo7tIzMQFvOl/pciKpA4hPSIVQVSHxCekxDnQ2t0L7RZ2W3/AeE98wDTKMIQJhxDzypFQs8axF4YDIWeNAbeJowGvAzmY/SO3UEPoVTreMhdVShrnTFL+DxaH2+9ifo/x6kL1o6gDZzaT2ElStQoMZWww/AKpPaITTYn1FV/DwBjCpupffpDpjk1nsK0XYE6W16gDXfKytOnID9CbU1Gx4Bumxqb3u02KQ1atqB5diUdeOdgJlSXWXsU7BpSZ1zhB9gl4WqXpIzhsv6ZW5U9XMZhmEYhmEYhmEYhmEYhgQ1EH2PzRyAsqU71OYTTaEpTB9TaArTxxSawvQxhaYwfUyhKUwfU2gK08cUmsL0MYWmMH1MoSlMH1NoCtPHFJrC9DGFpjB9/n2FVRTpjRqGYRjGf8NPRWRQcYcS5ZMAAAAASUVORK5CYII='} alt='character' />}
            </div>
            <div>
                <p style={{color: 'white'}}><span style={{fontWeight: 'bold', color: 'orange'}}>Bio:</span> {character.bio}</p>
                <p style={{color: 'white'}}><span style={{fontWeight: 'bold', color: 'orange'}}>Pronouns:</span> {character.pronouns}</p>
                <p style={{color: 'white'}}><span style={{fontWeight: 'bold', color: 'orange'}}>Profession:</span> {character.profession}</p>
                <p style={{color: 'white'}}><span style={{fontWeight: 'bold', color: 'orange'}}>Age:</span> {character.age}</p>
                <p style={{color: 'white'}}><span style={{fontWeight: 'bold', color: 'orange'}}>Location:</span> {character.location}</p>
            </div>
            <button onClick={removeCharacter}>Remove</button>
            <button onClick={selectCharacter}>Select Current Character</button>
        </div>
    );
}

export default CharacterCard;