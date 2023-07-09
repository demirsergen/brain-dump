import React from 'react';

const Bio = ({ user }) => {
  // display user info and add it to profile page
  return (
    <>
      <div>
        <h2>{user.displayname}</h2>
        <h2>{user.username}</h2>
        <p>{user.bio}</p>
      </div>
    </>
  );
};

export default Bio;
