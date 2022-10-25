import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "../components/Modal";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Dump from "../components/Dump";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import defaultAvatar from "../public/default-avatar.svg";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const [userDumps, setUserDumps] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
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

  const deleteDump = async (id) => {
    const dumpRef = doc(db, "dumps", id);
    await deleteDoc(dumpRef);
  };

  useEffect(() => {
    getDumps();
  }, [user, loading]);

  const handleModal = (selection, id) => {
    if (selection === "delete") {
      setShowModal(false);
      deleteDump(id);
    } else {
      setShowModal(false);
    }
  };

  if (showModal) {
    return <Modal handleModal={handleModal} deleteId={deleteId} />;
  }

  return (
    <div className="shadow p-2 my-4  bg-slate-600 rounded md:w-1/2 mx-auto">
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
      <div className="p-2 shadow rounded my-2">
        <h1 className="text-teal-50 text-center font-bold">My Posts</h1>
        {userDumps?.map((dump) => {
          return (
            <div key={dump.id} className="bg-slate-500 rounded pb-2">
              <Dump dump={dump} />
              <div className="flex items-center gap-2 px-2">
                <button
                  className="flex items-center gap-2 text-red-500 font-medium bg-teal-50 rounded p-1"
                  onClick={() => {
                    setShowModal(true);
                    setDeleteId(dump.id);
                  }}
                >
                  <BsFillTrashFill />
                  Delete
                </button>
                <Link href={{ pathname: "/addpost", query: dump }}>
                  <button className="flex items-center gap-2 text-teal-500 font-medium bg-teal-50 rounded p-1">
                    <AiFillEdit />
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
