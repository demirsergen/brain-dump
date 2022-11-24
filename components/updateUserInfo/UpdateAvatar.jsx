import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
const UpdateAvatar = () => {
  const [user, loading] = useAuthState(auth);
  const [file, setFile] = useState();
  const [message, setMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const storage = getStorage();

  const uploadAvatar = async (e) => {
    e.preventDefault();
    const photosRef = ref(storage, `images/${user.uid}/avatar.png`);
    try {
      await uploadBytes(photosRef, file)
        .then((snapshot) => {
          setMessage('Upload successful!');
        })
        .catch((error) => {
          setMessage(error);
        });
    } catch (error) {
      setMessage(error.message);
    }
    updateAvatar();
  };

  const updateAvatar = async () => {
    const photoRef = ref(storage, `images/${user.uid}/avatar.png`);
    await getDownloadURL(photoRef).then((url) => {
      setPhotoUrl(url);
    });

    if (photoRef) {
      const userRef = doc(db, 'users', user.uid);

      await updateDoc(userRef, {
        photoURL: photoUrl,
      });
    }
    setFile(null);
  };
  return (
    <div>
      <h1 className="text-teal-50 text-center uppercase font-bold">
        Update Avatar
      </h1>
      <form className="px-4">
        <div className="p-2 rounded">
          <label className="text-teal-50">Upload Avatar:</label>
          <input
            type="file"
            name="avatar"
            className="w-full bg-gray-100 p-2 rounded "
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button
          onClick={uploadAvatar}
          className="bg-teal-500 p-2 rounded text-teal-50 text-sm block w-full"
        >
          Upload
        </button>
        <span className="text-green-500 block mx-auto text-center p-4">
          {message && message}
        </span>
      </form>
    </div>
  );
};

export default UpdateAvatar;
