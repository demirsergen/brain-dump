import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/router';
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
} from 'firebase/firestore';

const AddComment = ({ post }) => {
  const [comment, setComment] = useState('');
  const [user, loading] = useAuthState(auth);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user]);

  const submitComment = async (e) => {
    e.preventDefault();
    const postCollectionRef = doc(db, 'posts', post.id);
    const commentsRef = collection(postCollectionRef, 'comments');
    await addDoc(commentsRef, {
      comment: comment,
      timestamp: serverTimestamp(),
      userId: user.uid,
    });

    setComment('');
  };
  return (
    <form className="w-full flex bg-red-100">
      <input
        type="text"
        name="comment"
        value={comment}
        placeholder="Add a comment..."
        onChange={(e) => setComment(e.target.value)}
        className="p-1 rounded flex-1"
      />
      <button
        className="bg-teal-500 p-1 text-teal-50 text-sm"
        onClick={submitComment}
      >
        Comment
      </button>
    </form>
  );
};

export default AddComment;
