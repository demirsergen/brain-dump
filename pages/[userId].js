import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../firebase';
import {
  query,
  doc,
  getDoc,
  where,
  onSnapshot,
  collection,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import Post from '../components/Post';

const UserProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const router = useRouter();
  const { userId } = router.query;

  const getUserInfo = async () => {
    const docRef = doc(db, 'users', userId);
    const data = await getDoc(docRef);
    setUserProfile(data.data());
  };

  const getUserPosts = async () => {
    if (loading) return;
    if (!user) return router.push('/auth/login');

    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('userId', '==', userId));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

      return unsubscribe;
    });
  };

  useEffect(() => {
    if (user?.uid === userId) {
      router.push('/profile');
    }
  }, [userId]);

  useEffect(() => {
    getUserPosts();
    getUserInfo();
  }, [userId]);

  return (
    <div className="shadow p-2 my-4  bg-slate-600 rounded md:w-1/2 mx-auto">
      <h1 className="text-teal-50 text-center">{` ${
        userProfile?.displayName ||
        userProfile?.username ||
        'Anonymous'
      }'s Posts`}</h1>
      <div>
        {userPosts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default UserProfile;
