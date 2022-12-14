import React, { useEffect, useState } from 'react';
import defaultAvatar from '../../public/default-avatar.svg';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Image from 'next/image';
import Link from 'next/link';

const Comment = ({ comment }) => {
  const [userInfo, setUserInfo] = useState();
  const userId = comment.userId;

  const getUserInfo = async () => {
    const docRef = doc(db, 'users', userId);
    const data = await getDoc(docRef);

    setUserInfo(data.data());
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div className="p-1 rounded bg-white my-1">
      <div className="flex items-center p-1 border-b-2">
        <Link href={`/${userId}`}>
          <Image
            src={userInfo?.photoURL || defaultAvatar}
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full cursor-pointer"
          />
        </Link>
        <Link href={`/${userId}`}>
          <span className="text-sm ml-1 text-gray-500 cursor-pointer">
            {userInfo?.username || 'anonymous'}
          </span>
        </Link>
      </div>
      <p className="p-1">{comment.comment}</p>
    </div>
  );
};

export default Comment;
