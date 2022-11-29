import React from 'react';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Link from 'next/link';

const PostButtons = ({ setShowModal, post, setDeleteId }) => {
  return (
    <div className="flex items-center gap-2 px-2">
      <button
        className="flex items-center gap-2 text-red-500 font-medium bg-teal-50 rounded p-1"
        onClick={() => {
          setShowModal(true);
          setDeleteId(post.id);
        }}
      >
        <BsFillTrashFill />
        Delete
      </button>
      <Link href={{ pathname: '/addpost', query: post }}>
        <button className="flex items-center gap-2 text-teal-500 font-medium bg-teal-50 rounded p-1">
          <AiFillEdit />
          Edit
        </button>
      </Link>
    </div>
  );
};

export default PostButtons;
