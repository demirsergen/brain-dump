import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import Comment from './Comment';

const Comments = ({ post }) => {
  const [comments, setComments] = useState();

  const getComments = () => {
    const commentsRef = collection(db, `posts/${post.id}/comments`);
    if (!commentsRef) return;

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
    const allComments = getComments(post.id);

    console.log(getComments());
    setComments(allComments);
  }, []);

  return (
    <div className="my-1 rounded overflow-hidden">
      {comments?.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
