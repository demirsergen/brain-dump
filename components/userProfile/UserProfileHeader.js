import React, { useEffect, useState } from "react";
import Image from "next/image";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultAvatar from "../../public/default-avatar.svg";
import UserProfileHeaderButtons from "./UserProfileHeaderButtons";
import { doc, getDoc } from "firebase/firestore";

const UserProfileHeader = () => {
  const [user, loading] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState();

  const getUpdatedUserInfo = async () => {
    const docRef = doc(db, "users", user.uid);
    const data = await getDoc(docRef);
    setCurrentUser(data.data());
  };

  useEffect(() => {
    getUpdatedUserInfo();
    console.log(currentUser);
  }, [user]);

  return (
    <div className="flex items-center gap-2 border-b-2 pb-2">
      <Image
        src={currentUser?.photoURL || defaultAvatar}
        alt="Picture of the profil owner"
        width={30}
        height={30}
        className="rounded-full"
      />
      <h1 className="text-teal-50">
        {currentUser?.username || currentUser?.email}
      </h1>
      <UserProfileHeaderButtons />
    </div>
  );
};

export default UserProfileHeader;
