import React from 'react';
import Votes from './Votes';
import Post from './post/Post';

const FilteredPosts = ({ filteredPosts }) => {
  return (
    <div className="shadow p-2 bg-slate-600 rounded mx-auto">
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
