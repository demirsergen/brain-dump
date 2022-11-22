import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import defaultAvatar from '../../public/default-avatar.svg';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import CommentButton from './CommentButton';

const Post = ({ post }) => {
  const [userProfile, setUserProfile] = useState();

  const getUserInfo = async () => {
    const docRef = doc(db, 'users', post.userId);
    const data = await getDoc(docRef);
    setUserProfile(data.data());
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className="bg-slate-500 my-2 rounded p-2 grow">
      <div className="flex gap-2">
        <Link href={`/${post.userId}`}>
          <Image
            src={post?.avatar || defaultAvatar}
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full cursor-pointer"
          />
        </Link>
        <h1 className="text-teal-50">
          {userProfile?.username ||
            userProfile?.displayName ||
            'Anonymous'}
        </h1>
      </div>
      <div className="bg-gray-100 rounded p-2 my-2">
        <p>{post.text}</p>
      </div>
      <div className="flex items-center justify-between border-b-2 w-full mb-2">
        <span className="text-teal-50">#{post.tag}</span>
        <div className="flex flex-col items-end  ">
          <span className="text-teal-50">
            {post?.timestamp?.toDate().toDateString()}
          </span>
          <span className="text-teal-50 underline">
            {post.updated ? 'Edited' : null}
          </span>
        </div>
      </div>
      <CommentButton />
    </div>
  );
};

export default Post;
