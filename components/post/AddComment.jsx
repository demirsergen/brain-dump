import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import { addComment } from './utils/addComment';

const AddComment = ({ post }) => {
  const [comment, setComment] = useState('');
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    addComment(post.id, user.uid, comment);
    setComment('');
  };
  return (
    <form className="w-full rounded flex overflow-hidden">
      <input
        type="text"
        name="comment"
        value={comment}
        placeholder="Add a comment..."
        onChange={(e) => setComment(e.target.value)}
        className="p-1 flex-1 bg-gray-100 text-sm"
      />
      <button
        className="bg-teal-500 p-1 text-teal-50 text-sm"
        onClick={handleSubmitComment}
      >
        Comment
      </button>
    </form>
  );
};

export default AddComment;
