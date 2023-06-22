import React, { useState } from 'react';
import AllPosts from '../components/AllPosts';
import SearchBar from '../components/SearchBar';
import Votes from '../components/Votes';
import Post from '../components/post/Post';
import {
  collection,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
  const [filteredPosts, setFilteredPosts] = useState();

  const getSearchResults = async (searchQuery) => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('tag', '==', searchQuery));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFilteredPosts(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return unsubscribe;
  };

  if (filteredPosts) {
    return (
      <div className="shadow p-2 bg-slate-600 rounded mx-auto w-2/3">
        <SearchBar getSearchResults={getSearchResults} />
        {filteredPosts.map((post) => (
          <div key={post.id} className={'flex mx-auto w-full'}>
            <Votes post={post} />
            <Post post={post} />
          </div>
        ))}{' '}
      </div>
    );
  }

  return (
    <div className="shadow p-2 bg-slate-600 rounded mx-auto w-2/3">
      <SearchBar getSearchResults={getSearchResults} />
      <AllPosts />
    </div>
  );
};

export default Dashboard;
