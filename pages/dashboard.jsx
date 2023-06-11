import React from 'react';
import AllPosts from '../components/AllPosts';
import SearchBar from '../components/SearchBar';

const Dashboard = () => {
  return (
    <div className="shadow p-2 bg-slate-600 rounded mx-auto w-2/3">
      <SearchBar />
      <AllPosts />
    </div>
  );
};

export default Dashboard;
