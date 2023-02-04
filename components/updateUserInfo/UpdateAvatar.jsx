import React, { useContext, useState } from 'react';
import { db } from '../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { AuthContext } from '../Layout';
import Button from './Button';
const UpdateAvatar = () => {
  const { currentUser } = useContext(AuthContext);
  const [file, setFile] = useState();
  const [message, setMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const storage = getStorage();

  const uploadAvatar = async (e) => {
    e.preventDefault();
    const photosRef = ref(
      storage,
      `images/${currentUser.uid}/avatar.png`
    );
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
    const photoRef = ref(
      storage,
      `images/${currentUser.uid}/avatar.png`
    );
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
    <div className="px-4">
      <h1 className="text-teal-50 text-center uppercase font-bold">
        Edit Avatar
      </h1>
      <form className="px-4 flex flex-col gap-2">
        <div className="rounded">
          <label className="text-teal-50">Upload Avatar:</label>
          <input
            type="file"
            name="avatar"
            className="w-full bg-gray-100 p-1 rounded "
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <Button title="Upload" handleClick={updateAvatar} />
        <span className="text-green-500 block mx-auto text-center p-4">
          {message && message}
        </span>
      </form>
    </div>
  );
};

export default UpdateAvatar;
