import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

export const deletePost = async (id) => {
  const postRef = doc(db, 'posts', id);
  await deleteDoc(postRef);
};
