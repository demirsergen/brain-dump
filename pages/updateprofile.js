import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const UpdateProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [file, setFile] = useState();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const storage = getStorage();
  console.log(file);

  const uploadAvatar = async (e) => {
    e.preventDefault();
    const photosRef = ref(storage, `images/${user.uid}/${file.name}`);
    try {
      await uploadBytes(photosRef, file)
        .then((snapshot) => {
          setMessage("Upload successful!");
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log(e.message);
    }
  };
  const updateInfo = async (e) => {
    e.preventDefault();
    setMessage("");
    const docRef = doc(db, "users", user.uid);
    const data = {
      username: username,
    };
    await updateDoc(docRef, data)
      .then((docRef) => {
        setMessage("You've successfully updated your info!");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="my-4 py-4 bg-slate-600 rounded md:w-1/2 mx-auto">
      <h1 className="text-teal-50 text-center uppercase font-bold">
        Update Info
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
            className="w-full bg-gray-100 p-2 rounded "
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button
          onClick={updateInfo}
          className="bg-teal-500 p-2 rounded text-teal-50 text-sm block w-full"
        >
          Update
        </button>

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
        <span className="text-teal-50 block mx-auto text-center p-4">
          {message && message}
        </span>
      </form>
    </div>
  );
};

export default UpdateProfile;
