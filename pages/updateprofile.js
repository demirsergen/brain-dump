import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const UpdateProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [photoUrl, setPhotoUrl] = useState("");
  const [username, setdisplayName] = useState("");
  return (
    <div className="my-4 py-4 bg-slate-600 rounded md:w-1/2 mx-auto">
      <h1 className="text-teal-50 text-center uppercase font-bold">
        Update Info
      </h1>
      <form className="px-2">
        <div className="p-2 rounded">
          <label className="text-teal-50">Username:</label>
          <br />
          <input
            type="text"
            value={username}
            name="username"
            placeholder="Username"
            className="w-full bg-gray-100 p-2 rounded "
          />
        </div>
        <div className="p-2 rounded">
          <label className="text-teal-50">Upload Avatar:</label>
          <input
            type="file"
            name="avatar"
            className="w-full bg-gray-100 p-2 rounded "
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
