import Head from 'next/head';
import Post from '../components/post/Post';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import Votes from '../components/Votes';
import { useRouter } from 'next/router';

export default function Home() {
  const [allPosts, setAllPosts] = useState();
  const [user, loading] = useAuthState(auth);

  const route = useRouter();

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

  useEffect(() => {
    if (!user) {
      route.push('/auth/login');
    }
  }, [user]);

  const environment = process.env.NODE_ENV;

  return (
    <div className="flex-1">
      <Head>
        <title>braindump</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href="/favicon1.png" />
      </Head>

      {/* change icon!! */}

      <div className="bg-slate-600 rounded p-2 flex flex-col gap-2 flex-grow">
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
    </div>
  );
}
