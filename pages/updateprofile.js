import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const UpdateProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [photoUrl, setPhotoUrl] = useState("");
  const [displayName, setdisplayName] = useState("");
  return (
    <form>
      <div>
        <label>Fullname:</label>
        <input
          type="text"
          value={displayName}
          name="displayName"
          placeholder="Fullname:"
        />
      </div>
    </form>
  );
};

export default UpdateProfile;
