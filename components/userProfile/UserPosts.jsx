import React, { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import Post from '../post/Post';
import Modal from '../Modal';
import Link from 'next/link';

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [user, loading] = useAuthState(auth);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();

  const router = useRouter();

  const getUserPosts = async () => {
    if (loading) return;
    if (!user) return router.push('/auth/login');

    const postsRef = collection(db, 'posts');
    const q = query(postsRef, where('userId', '==', user.uid));

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
  }, [user, loading]);

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
            <div className="flex items-center gap-2 px-2">
              <button
                className="flex items-center gap-2 text-red-500 font-medium bg-teal-50 rounded p-1"
                onClick={() => {
                  setShowModal(true);
                  setDeleteId(post.id);
                }}
              >
                <BsFillTrashFill />
                Delete
              </button>
              <Link href={{ pathname: '/addpost', query: post }}>
                <button className="flex items-center gap-2 text-teal-500 font-medium bg-teal-50 rounded p-1">
                  <AiFillEdit />
                  Edit
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserPosts;
