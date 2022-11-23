import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import defaultAvatar from '../../public/default-avatar.svg';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';

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
    <div className="p-1 bg-white my-1 ">
      <div className="flex items-center border-b-2 py-1">
        <Image
          src={userInfo?.photoURL || defaultAvatar}
          alt="avatar"
          width={20}
          height={20}
          className="rounded-full cursor-pointer"
        />
        <span className="text-sm ml-1">
          {userInfo?.username || 'anonymous'}
        </span>
      </div>
      <p className="p-1">{comment.comment}</p>
    </div>
  );
};

export default Comment;
