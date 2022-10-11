import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const signout = async () => {
    await signOut(auth)
      .then(() => {
        router.push("/auth/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(user);

  return (
    <div className="shadow p-4 my-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={user?.photoURL}
          alt="Picture of the profil owner"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h1>{user?.displayName}</h1>
      </div>
      <Link href="/auth/login">
        <button
          onClick={signout}
          className="bg-teal-500 p-2 rounded text-teal-50 text-sm"
        >
          Sign Out
        </button>
      </Link>
    </div>
  );
};

export default Profile;
