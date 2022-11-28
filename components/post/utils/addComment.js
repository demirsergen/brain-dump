import { db } from '../../../firebase';
import {
  doc,
  collection,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';

export const addComment = async (postId, userId, comment) => {
  const postCollectionRef = doc(db, 'posts', postId);
  const commentsRef = collection(postCollectionRef, 'comments');
  await addDoc(commentsRef, {
    comment: comment,
    timestamp: serverTimestamp(),
    userId: userId,
  });
};
