import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import Comment from './Comment';

const Comments = ({ post }) => {
  const [comments, setComments] = useState();

  const getComments = async () => {
    const commentsRef = collection(db, `posts/${post.id}/comments`);
    const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
      const newComments = [];
      snapshot.forEach((doc) => {
        newComments.push(doc.data());
        setComments(newComments);
      });
    });
    return unsubscribe;
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className=" bg-gray-300">
      {comments?.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
