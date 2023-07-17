import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import defaultAvatar from '../../public/default-avatar.svg';
import { db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import AddComment from './AddComment';
import Comments from './Comments';
import Options from '../userProfile/Options';

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

  if (userProfile) {
    return (
      <div className="bg-slate-500 w-full rounded py-2 px-4 my-1 grow">
        <div className="flex justify-between items-center">
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
            <Link href={`/${post.userId}`}>
              <h1 className="text-teal-50 text-sm cursor-pointer">
                {userProfile?.username ||
                  userProfile?.displayName ||
                  'Anonymous'}
              </h1>
            </Link>
          </div>
          <Options />
        </div>
        <div className="bg-gray-100 rounded p-2 my-2">
          <p className="text-black text-sm">{post.text}</p>
        </div>
        <div className="flex items-center justify-between w-full mb-2">
          <span className="text-teal-50 text-sm">#{post.tag}</span>
          <div className="flex flex-col items-end  ">
            <span className="text-teal-50 text-sm">
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
