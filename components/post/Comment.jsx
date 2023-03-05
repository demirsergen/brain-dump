import React, { useEffect, useState, useContext } from 'react';
import defaultAvatar from '../../public/default-avatar.svg';
import { BsTrash } from 'react-icons/bs';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Image from 'next/image';
import Link from 'next/link';
import { AuthContext } from '../Layout';

// write deleting logic
// remove the specific comment using its id

const Comment = ({ comment }) => {
  const [userInfo, setUserInfo] = useState();
  const { currentUser } = useContext(AuthContext);
  const commentUserId = comment.userId;

  const getUserInfo = async () => {
    const docRef = doc(db, 'users', commentUserId);
    const data = await getDoc(docRef);

    setUserInfo(data.data());
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (userInfo) {
    return (
      <div className="p-1 bg-white">
        <div className="flex items-center p-1 border-b-2">
          <Link href={`/${commentUserId}`}>
            <Image
              src={userInfo?.photoURL || defaultAvatar}
              alt="avatar"
              width={20}
              height={20}
              className="rounded-full cursor-pointer"
            />
          </Link>
          <Link href={`/${commentUserId}`}>
            <span className="text-sm ml-1 text-gray-500 cursor-pointer">
              {userInfo?.username || 'anonymous'}
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <p className="p-1">{comment.comment}</p>
          <span
            className={
              commentUserId === currentUser.uid ? 'block' : 'hidden'
            }
          >
            <BsTrash size={20} className="cursor-pointer" />
          </span>
        </div>
      </div>
    );
  }
};

export default Comment;
