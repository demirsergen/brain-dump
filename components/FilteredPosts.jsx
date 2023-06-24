import React from 'react';
import Votes from './Votes';
import Post from './post/Post';

const FilteredPosts = ({
  filteredPosts,
  isFiltered,
  filterQuery,
}) => {
  return (
    <div className="shadow p-2 bg-slate-600 rounded mx-auto">
      {isFiltered && (
        <p className="text-white text-sm">Filter: {filterQuery}</p>
      )}
      {filteredPosts.map((post) => (
        <div key={post.id} className={'flex mx-auto w-full'}>
          <Votes post={post} />
          <Post post={post} />
        </div>
      ))}{' '}
    </div>
  );
};

export default FilteredPosts;
