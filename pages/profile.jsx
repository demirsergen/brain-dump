import React, { useContext } from 'react';
import UserProfileHeader from '../components/userProfile/UserProfileHeader';
import UserPosts from '../components/userProfile/UserPosts';
import { AuthContext } from '../components/Layout';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  // find a way to incorporate IAC API into this app
  // make it interesting and related to chicago

  if (currentUser) {
    return (
      <div className="shadow p-2 bg-slate-600 rounded md:w-1/2 mx-auto flex-1">
        <UserProfileHeader currentUser={currentUser} />
        <UserPosts />
      </div>
    );
  }
};

export default Profile;
