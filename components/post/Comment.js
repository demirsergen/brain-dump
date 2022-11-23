import React, { useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

const Comment = ({ comment }) => {
  const [comments, setComments] = useState([]);
  // TODOS
  // get user by user id and add avatar to next to the comment

  //   const getComments = () => {
  //     const postCollectionRef = collection(db, 'posts');
  //     const commentsRef = collection(postCollectionRef, 'comments');
  //     const q = query(postCollectionRef, orderBy('timestamp', 'desc'));
  //     const unsubscribe = onSnapshot(q, (snapshot) => {
  //       setAllPosts(
  //         snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //       );
  //     });

  //     return unsubscribe;
  //   };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div>
      <p>{comment}</p>
    </div>
  );
};

export default Comment;
