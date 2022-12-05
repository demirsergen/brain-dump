import React, { useContext } from 'react';
import UserProfileHeader from '../components/userProfile/UserProfileHeader';
import UserPosts from '../components/userProfile/UserPosts';
import { AuthContext } from '../components/Layout';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return (
      <div className="shadow p-2 my-4  bg-slate-600 rounded md:w-1/2 mx-auto">
        <UserProfileHeader />
        <UserPosts />
      </div>
    );
  }
};

export default Profile;
