import React, { useState } from 'react';
import AllPosts from '../components/AllPosts';
import SearchBar from '../components/SearchBar';
import FilteredPosts from '../components/FilteredPosts';
import {
  collection,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

const Dashboard = () => {
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
      <AllPosts />
    </div>
  );
};

export default Dashboard;
