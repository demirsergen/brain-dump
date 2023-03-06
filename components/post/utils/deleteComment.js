import { db } from '../../../firebase';
import { doc, collection, deleteDoc } from 'firebase/firestore';

export const deleteComment = async (postId, commentId) => {
  const postCollectionRef = doc(db, 'posts', postId);
  const commentsRef = collection(postCollectionRef, 'comments');

  const docRef = doc(commentsRef, commentId);

  await deleteDoc(docRef);
};
