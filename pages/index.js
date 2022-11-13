import Head from 'next/head';
import Post from '../components/Post';
import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../firebase';
import Votes from '../components/Votes';

export default function Home() {
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

  return (
    <div className="md:w-1/2 mx-auto">
      <Head>
        <title>braindump</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-slate-600 rounded p-2">
        <h1 className="text-teal-50 text-center font-bold">
          Latest Posts
        </h1>
        {allPosts?.map((post) => (
          <div key={post.id} className="flex">
            <Votes post={post} />
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
