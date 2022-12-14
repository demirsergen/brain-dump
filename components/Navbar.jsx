import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import { db } from '../firebase';
import { MdAdd } from 'react-icons/md';
import Image from 'next/image';
import defaultAvatar from '../public/default-avatar.svg';
import { doc, getDoc } from 'firebase/firestore';
import { AuthContext } from './Layout';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className="flex items-center justify-between p-4 md:w-1/2 mx-auto">
      <Link href="/">
        <button className=" text-teal-50 font-bold">
          {' '}
          braindump
        </button>
      </Link>

      {currentUser ? (
        <ul className="flex items-center gap-2">
          <Link href="/addpost">
            <a>
              <MdAdd
                className="bg-teal-500 rounded text-teal-50"
                size={30}
              />
            </a>
          </Link>
          <Link href="/profile">
            <Image
              src={currentUser?.photoURL || defaultAvatar}
              alt="Picture of the profil owner"
              width={30}
              height={30}
              className="rounded-full cursor-pointer"
            />
          </Link>
        </ul>
      ) : (
        <ul>
          <Link href="/auth/signup">
            <button className=" px-4 py-2 bg-teal-500 rounded text-sm text-teal-50">
              Join Us
            </button>
          </Link>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
