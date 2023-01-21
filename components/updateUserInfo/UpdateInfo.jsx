import React, { useState } from 'react';
import { doc, writeBatch } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebase';
import Button from './Button';

const UpdateInfo = () => {
  const [user, loading] = useAuthState(auth);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  const batch = writeBatch(db);

  const updateInfo = async (e) => {
    e.preventDefault();
    setMessage('');
    const userRef = doc(db, 'users', user.uid);
    if (username && fullname) {
      batch.update(userRef, {
        username: username,
        displayName: fullname,
      });
    } else if (fullname && !username) {
      batch.update(userRef, { displayName: fullname });
    } else if (!fullname && username) {
      batch.update(userRef, { username: username });
    } else {
      return;
    }
    await batch.commit();
    setMessage("You've successfully updated your info!");
    setUsername('');
    setFullname('');
  };
  return (
    <div className="px-4">
      <h1 className="text-teal-50 text-center uppercase font-bold">
        Edit Info
      </h1>
      <form className="px-4">
        <div className="p-2 rounded">
          <label className="text-teal-50">Username:</label>
          <br />
          <input
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            className="w-full bg-gray-100 p-1 rounded "
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="p-2 rounded">
          <label className="text-teal-50">Fullname:</label>
          <br />
          <input
            type="text"
            value={fullname}
            name="fullname"
            placeholder="Fullname"
            className="w-full bg-gray-100 p-1 rounded "
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <Button title="Update" handleClick={updateInfo} />
        <span className="text-green-500 block mx-auto text-center p-4">
          {message && message}
        </span>
      </form>
    </div>
  );
};

export default UpdateInfo;
