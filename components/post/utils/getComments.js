// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '../../../firebase';

// export const getComments = (postId) => {
//   const commentsRef = collection(db, `posts/${postId}/comments`);
//   if (!commentsRef) return;

//   const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
//     const newComments = [];
//     snapshot.forEach((doc) => {
//       newComments.push(doc.data());
//     });
//     return newComments;
//   });
//   return unsubscribe;
// };
