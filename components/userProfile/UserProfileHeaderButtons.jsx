import React from 'react';
import Link from 'next/link';
import { signout } from './utils/signout';

const UserProfileHeaderButtons = () => {
  return (
    <div className="flex item-center justify-end gap-2 ml-auto">
      <Link href="/updateprofile">
        <button className="bg-teal-500 p-2 rounded text-teal-50 text-sm">
          Update
        </button>
      </Link>
      <Link href="/auth/login">
        <button
          onClick={signout}
          className="bg-teal-500 p-2 rounded text-teal-50 text-sm"
        >
          Sign Out
        </button>
      </Link>
    </div>
  );
};

export default UserProfileHeaderButtons;
