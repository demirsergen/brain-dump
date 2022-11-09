import React from "react";
import Image from "next/image";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultAvatar from "../../public/default-avatar.svg";
import UserProfileHeaderButtons from "./UserProfileHeaderButtons";

const UserProfileHeader = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <div className="flex items-center gap-2 border-b-2 pb-2">
      <Image
        src={user?.photoURL || defaultAvatar}
        alt="Picture of the profil owner"
        width={30}
        height={30}
        className="rounded-full"
      />
      <h1 className="text-teal-50">{user?.displayName || user?.email}</h1>
      <UserProfileHeaderButtons />
    </div>
  );
};

export default UserProfileHeader;
