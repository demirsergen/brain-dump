import React from 'react';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const UserProfileHeaderButtons = () => {
  const signout = async () => {
    await signOut(auth)
      .then(() => {
        router.push('/auth/login');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="flex ml-auto gap-2">
      <Link href="/updateprofile" className="block">
        <button className="bg-teal-500 p-2 rounded text-teal-50 text-sm ml-auto">
          Update
        </button>
      </Link>
      <Link href="/auth/login" className="block">
        <button
          onClick={signout}
          className="bg-teal-500 p-2 rounded text-teal-50 text-sm ml-auto"
        >
          Sign Out
        </button>
      </Link>
    </div>
  );
};

export default UserProfileHeaderButtons;
