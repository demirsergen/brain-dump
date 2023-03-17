import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../components/Layout';

const Votes = ({ post }) => {
  const [voteCount, setVoteCount] = useState(0);
  const [voted, setVoted] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // clean up this code.

  const getVoteCount = async () => {
    const postRef = doc(db, 'posts', post.id);
    const document = await getDoc(postRef);
    const documentData = document.data();
    const { postVotes } = documentData;

    const existingVote = postVotes.includes(currentUser?.uid);
    if (existingVote) setVoted(true);

    setVoteCount(postVotes.length);
    setLoading(false);
  };

  const onVote = async (postId, userId) => {
    const postRef = doc(db, 'posts', postId);
    const document = await getDoc(postRef);
    const documentData = document.data();
    const { postVotes } = documentData;

    const existingVote = postVotes.includes(userId);

    if (!existingVote) {
      await updateDoc(postRef, {
        postVotes: [...postVotes, userId],
      });
      setVoted(true);
    } else {
      const newPostVotes = postVotes.filter(
        (vote) => vote !== userId
      );
      await updateDoc(postRef, {
        postVotes: [...newPostVotes],
      });
      setVoted(false);
    }
  };

  useEffect(() => {
    getVoteCount();
  }, [voted]);

  if (currentUser) {
    return (
      <div className="flex flex-col items-center justify-center p-2 gap-2 text-teal-50">
        <button
          onClick={() => onVote(post.id, currentUser.uid)}
          className={voted ? 'text-green-400' : ''}
        >
          <AiOutlineArrowUp size={20} />
        </button>
        <span
          className={
            voteCount == 0
              ? ''
              : voteCount > 0
              ? 'text-green-400'
              : ''
          }
        >
          {voteCount}
        </span>
      </div>
    );
  }
};

export default Votes;
