import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import Dump from "../components/Dump";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [userDumps, setUserDumps] = useState([]);
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

  const getDumps = async () => {
    if (loading) return;
    if (!user) return router.push("/auth/login");

    const dumpsRef = collection(db, "dumps");
    const q = query(dumpsRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserDumps(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return unsubscribe;
  };

  useEffect(() => {
    getDumps();
  }, [user, loading]);

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
      <div className="p-2 shadow rounded my-2">
        <h1 className="text-teal-50">My Dumps</h1>
        {userDumps.map((dump) => {
          return (
            <div key={dump.id} className="bg-slate-500 rounded pb-2">
              <Dump dump={dump} />
              <div className="flex items-center gap-2 px-2">
                <button className="flex items-center gap-2 text-red-500">
                  <BsFillTrashFill />
                  Delete
                </button>
                <button className="flex items-center gap-2 text-teal-500">
                  <AiFillEdit />
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
