import React, { useState, useEffect, useContext } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';
import Post from '../post/Post';
import Modal from '../Modal';
import { AuthContext } from '../Layout';
import PostButtons from './PostButtons';
import { deletePost } from './utils/deletePost';

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const getUserPosts = async () => {
    if (!currentUser) return router.push('/auth/login');
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('userId', '==', currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUserPosts(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setLoading(false);
    });

    return unsubscribe;
  };

  useEffect(() => {
    getUserPosts();
  }, []);

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
  if (loading) {
    return <div className="text-red-900">Loading...</div>;
  }

  return (
    <div className="p-2 shadow rounded my-2 flex flex-col gap-2">
      <h1 className="text-teal-50 text-center font-bold">
        {userPosts.length < 1
          ? 'You have not posted anything yet...'
          : 'Your Posts'}
      </h1>
      {userPosts?.map((post) => {
        return (
          <div key={post.id} className="bg-slate-500 rounded pb-2">
            <Post
              post={post}
              setShowModal={setShowModal}
              setDeleteId={setDeleteId}
            />
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
