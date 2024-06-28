import './CharacterCreator.css';

// Firebase imports
import { serverTimestamp, setDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// React imports
import React, { useState, useEffect } from 'react';

import { firestore, storage, auth, db } from '../firebase.js'

const CharacterCreator = () => {
    const [inputs, setInputs] = useState({
        name: '',
        bio: '',
        image: null,
        pronouns: '',
        profession: '',
        age: '',
        location: '',
    });

    // set initial state for the object 
    const [imageURL, setImageURL] = useState();
    const docRef = doc(db, "users", 'user.'+auth.currentUser.email);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data());
        };
        fetchData();
    }, []);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setInputs((values) => ({
        ...values, [name]: name === 'image' ? files[0] : value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted:', inputs);
        uploadFile();
        const characterData = {
            name: inputs.name,
            bio: inputs.bio,
            pronouns: inputs.pronouns,
            profession: inputs.profession,
            age: inputs.age,
            location: inputs.location,
            image: imageURL.img,
            timestamp: serverTimestamp()
        };
        setDoc(doc(firestore, "characters", 'id.'+inputs.name), characterData);
        let temp = user.characters;
        temp.push('id.'+inputs.name);
        setDoc(doc(firestore, "users", 'user.'+auth.currentUser.email), {characters: temp});
    };
    // call setfile on file input onChange
    const uploadFile = () => {
        //By creating a reference to a file, your app gains access to it.
        const storageRef = ref(storage, `images/test1234`);
        const uploadTask = uploadBytesResumable(storageRef, inputs.image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("upload is" + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload paused");
                break;
              case "running":
                console.log("Upload running");
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadedURL) => {
              // you keep uploaded img url
              setImageURL((prev) => ({ ...prev, img: downloadedURL }));
            });
          }
        );
      };

    const handleClick = (newName) => {
        console.log('Current state:', inputs);
    };

    return (
        <div className='characterCreator'>
            <form onSubmit={handleSubmit}>
                <div className='name'>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={inputs.name}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <div className='bio'>
                    <label className='bio'>
                    Bio:
                    <input
                        type="text"
                        name="bio"
                        value={inputs.bio}
                        onChange={handleChange}
                    />
                    </label>
                </div>
                <div className='image'>
                    <label>
                    Image:
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                    </label>
                </div>
                <div className='pronouns'>
                    <label>
                    Pronouns:
                    <input
                        type="text"
                        name="pronouns"
                        value={inputs.pronouns}
                        onChange={handleChange}
                    />
                    </label>
                </div>
                <div className='profession'>
                    <label>
                    Profession:
                    <input
                        type="text"
                        name="profession"
                        value={inputs.profession}
                        onChange={handleChange}
                    />
                    </label>
                </div>
                <div className='age'>
                    <label>
                    Age:
                    <input
                        type="number"
                        name="age"
                        value={inputs.age}
                        onChange={handleChange}
                    />
                    </label>
                </div>
                <div className='location'>
                    <label>
                    Location:
                    <input
                        type="text"
                        name="location"
                        value={inputs.location}
                        onChange={handleChange}
                    />
                    </label>
                </div>
                <input type="submit" />
            </form>
            <button onClick={handleClick}>HANDLE</button>
        </div>
    );
};

export default CharacterCreator;
