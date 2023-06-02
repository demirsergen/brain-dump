import React, { useContext, useEffect } from 'react';
import UserProfileHeader from '../components/userProfile/UserProfileHeader';
import UserPosts from '../components/userProfile/UserPosts';
import { AuthContext } from '../components/Layout';
import { useRouter } from 'next/router';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const router = useRouter();

  if (!currentUser) {
    router.push('/login');
  }

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
