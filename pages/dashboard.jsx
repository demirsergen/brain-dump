import React, { useState, useEffect } from 'react';
import AllPosts from '../components/AllPosts';
import SearchBar from '../components/SearchBar';
import FilteredPosts from '../components/FilteredPosts';
import {
  collection,
  query,
  onSnapshot,
  where,
  orderBy,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';
import { runPrompt } from '../openai';

const Dashboard = () => {
  const [allPosts, setAllPosts] = useState();
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [filterQuery, setFilterQuery] = useState('');

  const getSearchResults = async (searchQuery) => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('tag', '==', searchQuery));
    setFilterQuery(searchQuery);

    const querySnapshot = await getDocs(q);
    const docs = [];

    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id });
    });

    setFilteredPosts([...docs]);
  };

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

  runPrompt('hello old friend...');

  if (filteredPosts) {
    return (
      <div className="shadow p-2 bg-slate-600 rounded mx-auto w-2/3">
        <SearchBar getSearchResults={getSearchResults} />
        <button
          onClick={() => {
            setFilteredPosts(null);
            setFilterQuery('');

            getAllPosts();
          }}
          className="text-white text-sm bg-teal-600 px-2 py-1 m-1 rounded"
        >
          All
        </button>
        {filteredPosts && (
          <span className="text-white text-sm">
            Filter: {filterQuery}
          </span>
        )}
        <FilteredPosts filteredPosts={filteredPosts} />
      </div>
    );
  }

  return (
    <div className="shadow p-2 bg-slate-600 rounded mx-auto w-2/3">
      <SearchBar getSearchResults={getSearchResults} />
      <AllPosts allPosts={allPosts} />
    </div>
  );
};

export default Dashboard;
