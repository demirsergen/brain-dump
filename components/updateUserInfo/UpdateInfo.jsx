import React, { useState } from 'react';
import { doc, writeBatch } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebase';
import Button from './Button';

const UpdateInfo = () => {
  const [user, loading] = useAuthState(auth);
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [message, setMessage] = useState('');

  const batch = writeBatch(db);

  const updateInfo = async (e) => {
    e.preventDefault();
    setMessage('');
    const userRef = doc(db, 'users', user.uid);
    if (username && fullname && bio) {
      batch.update(userRef, {
        username: username,
        displayName: fullname,
        bio: bio,
      });
    } else if (fullname && !username) {
      batch.update(userRef, { displayName: fullname });
    } else if (!fullname && username) {
      batch.update(userRef, { username: username });
    } else if (bio && !username && !fullname) {
      batch.update(userRef, { bio: bio });
    } else if (bio && username && !fullname) {
      batch.update(userRef, { bio: bio, username: username });
    } else if (bio && !username && fullname) {
      batch.update(userRef, { bio: bio, fullname: fullname });
    } else {
      return;
    }
    await batch.commit();
    setMessage("You've successfully updated your info!");
    setUsername('');
    setFullname('');
  };
  return (
    <div className="px-4 text-sm">
      <h1 className="text-teal-50 text-center font-bold">
        Edit Profile
      </h1>
      <form className="px-4 flex flex-col gap-2">
        <div className="rounded">
          <label className="text-teal-50">Username:</label>
          <br />
          <input
            type="text"
            value={username}
            name="username"
            placeholder="New username"
            className="w-full bg-gray-100 p-1 rounded "
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="rounded">
          <label className="text-teal-50">Fullname:</label>
          <br />
          <input
            type="text"
            value={fullname}
            name="fullname"
            placeholder="New Fullname"
            className="w-full bg-gray-100 p-1 rounded "
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div className="rounded">
          <label className="text-teal-50">Bio:</label>
          <br />
          <textarea
            type="text"
            rows={2}
            value={bio}
            name="bio"
            placeholder="New Bio"
            className="w-full bg-gray-100 p-1 rounded "
            onChange={(e) => setBio(e.target.value)}
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
