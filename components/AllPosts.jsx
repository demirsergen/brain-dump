import React, { useState, useEffect } from 'react';
import Votes from './Votes';
import Post from './post/Post';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';

const AllPosts = () => {
  const [allPosts, setAllPosts] = useState();

  const getAllPosts = async () => {
    const postCollectionRef = collection(db, 'posts');
    const q = query(postCollectionRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAllPosts(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return unsubscribe;
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const environment = process.env.NODE_ENV;

  return (
    <div className="bg-slate-600 rounde w-full d p-2 flex flex-col gap-2 flex-grow">
      <h1 className="text-teal-50 text-center font-bold">
        Latest Posts
      </h1>
      {allPosts?.map((post) => (
        <div
          key={post.id}
          className={
            environment === 'development'
              ? 'flex mx-auto w-full'
              : 'flex mx-auto w-2/3'
          }
        >
          <Votes post={post} />
          <Post post={post} />
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
