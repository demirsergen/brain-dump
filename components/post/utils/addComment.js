import { db } from '../../../firebase';
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

export const addComment = async (postId, userId, comment) => {
  const postCollectionRef = doc(db, 'posts', postId);
  const commentsRef = collection(postCollectionRef, 'comments');

  const newComment = {
    comment: comment,
    timestamp: serverTimestamp(),
    userId: userId,
    postId: postId,
    commentId: '',
  };
  await addDoc(commentsRef, newComment).then((comment) => {
    const docId = comment.id;
    newComment.commentId = docId;

    setDoc(comment, newComment);
  });
};
