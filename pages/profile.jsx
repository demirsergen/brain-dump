import React, { useContext } from 'react';
import UserProfileHeader from '../components/userProfile/UserProfileHeader';
import UserPosts from '../components/userProfile/UserPosts';
import { AuthContext } from '../components/Layout';
import { useRouter } from 'next/router';

const Profile = () => {
  const { currentUser } = useContext(AuthContext);

  const router = useRouter();

  // if (!currentUser) {
  //   router.push('/login');
  // }

  if (currentUser) {
    return (
      <div className="shadow p-2 bg-slate-600 rounded mx-auto sm:w-full md:w-2/3 ">
        <UserProfileHeader currentUser={currentUser} />
        <UserPosts />
      </div>
    );
  }
};

export default Profile;
