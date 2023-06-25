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
} from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
  const [allPosts, setAllPosts] = useState();
  const [filteredPosts, setFilteredPosts] = useState();
  const [filterQuery, setFilterQuery] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const getSearchResults = async (searchQuery) => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('tag', '==', searchQuery));
    setFilterQuery(searchQuery);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFilteredPosts(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setIsFiltered(true);
    });

    return unsubscribe;
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

  if (filteredPosts) {
    return (
      <div className="shadow p-2 bg-slate-600 rounded mx-auto w-2/3">
        <SearchBar getSearchResults={getSearchResults} />
        <FilteredPosts
          filteredPosts={filteredPosts}
          filterQuery={filterQuery}
          isFiltered={isFiltered}
        />
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
