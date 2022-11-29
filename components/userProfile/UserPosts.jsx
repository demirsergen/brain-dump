import React, { useState, useEffect, useContext } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';
import Post from '../post/Post';
import Modal from '../Modal';
import { AuthContext } from '../Layout';
import PostButtons from './PostButtons';

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const router = useRouter();

  const getUserPosts = async () => {
    if (!currentUser) return router.push('/auth/login');

    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    return unsubscribe;
  };

  const deletePost = async (id) => {
    const postRef = doc(db, 'posts', id);
    await deleteDoc(postRef);
  };

  useEffect(() => {
    getUserPosts();
  }, [currentUser]);

  const handleModal = (selection, id) => {
    if (selection === 'delete') {
      setShowModal(false);
      deletePost(id);
    } else {
      setShowModal(false);
    }
  };

  if (showModal) {
    return <Modal handleModal={handleModal} deleteId={deleteId} />;
  }
  return (
    <div className="p-2 shadow rounded my-2">
      <h1 className="text-teal-50 text-center font-bold">My Posts</h1>
      {userPosts?.map((post) => {
        return (
          <div key={post.id} className="bg-slate-500 rounded pb-2">
            <Post post={post} />
            <PostButtons
              setShowModal={setShowModal}
              post={post}
              setDeleteId={setDeleteId}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UserPosts;
