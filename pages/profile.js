import React from "react";
import { auth, db } from "../firebase";
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

  return (
    <div className="shadow p-4 my-4  bg-slate-600 rounded">
      <div className="flex items-center gap-2">
        <Image
          src={user?.photoURL}
          alt="Picture of the profil owner"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h1 className="text-teal-50">{user?.displayName}</h1>
        <Link href="/auth/login">
          <button
            onClick={signout}
            className="bg-teal-500 p-2 rounded text-teal-50 text-sm ml-auto"
          >
            Sign Out
          </button>
        </Link>
      </div>
      <div className="p-2 shadow bg-slate-500 rounded my-2">
        <h1 className="text-teal-50">My Dumps</h1>
      </div>
    </div>
  );
};

export default Profile;
