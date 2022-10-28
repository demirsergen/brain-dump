import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import defaultAvatar from "../public/default-avatar.svg";
import { useAuthState } from "react-firebase-hooks/auth";

const UserProfile = () => {
  const [user] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState();
  const router = useRouter();
  const { userId } = router.query;

  const getUserInfo = async () => {
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    const userInfo = userDoc.data();

    setUserProfile(userInfo);
  };

  useEffect(() => {
    if (user?.uid === userId) {
      router.push("/profile");
    }
  });

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  return (
    <div className="shadow p-2 my-4  bg-slate-600 rounded md:w-1/2 mx-auto">
      <div className="flex items-center gap-2 border-b-2 pb-2">
        <Image
          src={userProfile?.photoURL || defaultAvatar}
          alt="Picture of the profil owner"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h1 className="text-teal-50">
          {userProfile?.displayName || userProfile?.email}
        </h1>
      </div>
    </div>
  );
};

export default UserProfile;
