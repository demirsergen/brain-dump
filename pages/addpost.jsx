import { useRouter } from 'next/router';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';

const Addpost = () => {
  const [user, loading] = useAuthState(auth);
  const [post, setPost] = useState({
    text: '',
    tag: '',
  });

  const router = useRouter();
  const routerData = router.query;

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
    }
  }, [user]);

  const handleChange = (e) => {
    const value = e.target.value;
    setPost({
      ...post,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postCollectionRef = collection(db, 'posts');
    await addDoc(postCollectionRef, {
      ...post,
      timestamp: serverTimestamp(),
      userId: user.uid,
      voteCount: 0,
      postVotes: [],
    });

    setPost({
      text: '',
      tag: '',
    });

    router.push('/dashboard');
  };

  const checkForEdit = () => {
    if (routerData.id) {
      setPost({
        text: routerData.text,
        id: routerData.id,
        tag: routerData.tag,
      });
    }
  };

  useEffect(() => {
    checkForEdit();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const postRef = doc(db, 'posts', routerData.id);
    await updateDoc(postRef, {
      text: post.text,
      tag: post.tag,
      updated: true,
    });

    router.push('/profile');
  };

  return (
    <div className="py-4 bg-slate-600 rounded md:w-1/2 mx-auto flex-1">
      <h1 className="text-teal-50 text-center uppercase font-bold">
        {routerData.id ? 'Update Your Idea' : 'Share a new Idea'}
      </h1>
      <form
        className="px-2"
        onSubmit={routerData.id ? handleUpdate : handleSubmit}
      >
        <div className="p-2 rounded">
          <label htmlFor="post" className="text-teal-50">
            Post your idea:
          </label>
          <br />
          <textarea
            name="text"
            cols="30"
            rows="7"
            className="w-full bg-gray-100 p-2 rounded "
            placeholder="Let your mind speak..."
            value={post.text}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="p-2 rounded">
          <label htmlFor="tag" className="text-teal-50">
            Tag:
          </label>
          <br />
          <input
            type="text"
            name="tag"
            className="w-full bg-gray-100 p-2 rounded"
            placeholder="daily, friendship, tech?"
            value={post.tag}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="bg-teal-500 text-teal-50 w-full text-bold my-2 p-2 rounded block mx-auto"
        >
          {routerData.id ? 'Update' : 'Share'}
        </button>
      </form>
    </div>
  );
};

export default Addpost;
