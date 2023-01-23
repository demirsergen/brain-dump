import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import defaultAvatar from '../../public/default-avatar.svg';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import AddComment from './AddComment';
import Comments from './Comments';

const Post = ({ post }) => {
  const [userProfile, setUserProfile] = useState();
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const docRef = doc(db, 'users', post.userId);
    const data = await getDoc(docRef);
    setUserProfile(data.data());
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (userProfile) {
    return (
      <div className="bg-slate-500 rounded p-2 grow my-1">
        <div className="flex gap-2">
          <Link href={`/${post.userId}`}>
            <Image
              src={userProfile?.photoURL || defaultAvatar}
              alt="avatar"
              width={20}
              height={20}
              className="rounded-full cursor-pointer"
            />
          </Link>
          <h1 className="text-teal-50 text-sm">
            {userProfile?.username ||
              userProfile?.displayName ||
              'Anonymous'}
          </h1>
        </div>
        <div className="bg-gray-100 rounded p-2 my-2">
          <p className="text-black">{post.text}</p>
        </div>
        <div className="flex items-center justify-between w-full mb-2">
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
        <AddComment post={post} />
        <Comments post={post} />
      </div>
    );
  }
};

export default Post;
