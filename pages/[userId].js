import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db, auth } from "../firebase";
import {
  doc,
  getDoc,
  query,
  where,
  onSnapshot,
  collection,
  setLogLevel,
} from "firebase/firestore";
import Image from "next/image";
import defaultAvatar from "../public/default-avatar.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import Dump from "../components/Dump";

const UserProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [userPosts, setUserPosts] = useState([]);
  const router = useRouter();
  const { userId } = router.query;

  const getUserPosts = async () => {
    if (loading) return;
    if (!user) return router.push("/auth/login");

    const postsRef = collection(db, "dumps");
    const q = query(postsRef, where("userId", "==", userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

      return unsubscribe;
    });
  };

  useEffect(() => {
    if (user?.uid === userId) {
      router.push("/profile");
    }
  }, []);

  useEffect(() => {
    getUserPosts();
  }, [userId]);

  return (
    <div className="shadow p-2 my-4  bg-slate-600 rounded md:w-1/2 mx-auto">
      <h1 className="text-teal-50 text-center">Posts</h1>
      <div>
        {userPosts.map((post) => {
          return <Dump key={post.id} dump={post} />;
        })}
      </div>
    </div>
  );
};

export default UserProfile;
