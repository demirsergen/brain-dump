import React from "react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import defaultAvatar from "../../public/default-avatar.svg";
import { signOut } from "firebase/auth";

const UserProfileHeader = () => {
  const [user, loading] = useAuthState(auth);

  const signout = async () => {
    await signOut(auth)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      <Link href="/auth/login">
        <button
          onClick={signout}
          className="bg-teal-500 p-2 rounded text-teal-50 text-sm ml-auto"
        >
          Sign Out
        </button>
      </Link>
    </div>
  );
};

export default UserProfileHeader;
