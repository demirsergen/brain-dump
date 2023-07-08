import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import defaultAvatar from '../public/default-avatar.svg';
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
import Post from '../components/post/Post';

const UserProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [userProfile, setUserProfile] = useState();
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  const router = useRouter();
  const { userId } = router.query;

  const getUserInfo = async () => {
    if (userId) {
      const docRef = doc(db, 'users', userId);
      const data = await getDoc(docRef);
      setUserProfile(data?.data());
    }
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

  // FINISH UP THIS FUNCTION
  const handleFollow = async () => {
    if (!user) return router.push('/auth/login');

    try {
      // Create 'following' document for the user who clicked the button
      await firestore
        .collection('users')
        .doc(user.uid)
        .collection('following')
        .doc(userId)
        .set({
          following: true,
        });

      // Create 'followers' document for the user who is being followed
      await firestore
        .collection('users')
        .doc(userId)
        .collection('followers')
        .doc(user.uid)
        .set({
          follower: true,
        });

      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user:', error);
    }

    // const followedByRef = collection(db, `users/${userId}/followed`)
    // const followingRef = collection(db, `users/${userId}/following`)

    // store data in state
  };

  // THIS IS THE NEW FEATURE, JUST WORK ON IT

  useEffect(() => {
    if (user?.uid === userId) {
      router.push('/profile');
    }

    getUserPosts();
    getUserInfo();
  }, [userId]);

  return (
    <div className="shadow p-2  bg-slate-600 rounded md:w-2/3 mx-auto">
      <div className="flex items-center gap-2 mb-2 p-2">
        <Image
          src={userProfile?.photoURL || defaultAvatar}
          alt="Picture of the profil owner"
          width={30}
          height={30}
          className="rounded-full"
        />
        <h1 className="text-teal-50 text-center">{` ${
          userProfile?.displayName ||
          userProfile?.username ||
          'Anonymous'
        }`}</h1>
        <span className="border-2 rounded p-1 text-sm cursor-pointer text-white">
          {!alreadyFollowed ? 'Follow' : 'Unfollow'}
        </span>
      </div>

      <div>
        {userPosts.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default UserProfile;
