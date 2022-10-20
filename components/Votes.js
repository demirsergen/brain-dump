import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { db } from "../firebase";

const Votes = ({ votes, id, dump }) => {
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  // Firebase should know users who upvoted or downvoted;
  // each post should have upvoted and downvoted collection
  // dump => upvotes => user.id
  // dump => downvotes => user.id

  const updateVotes = async () => {
    const dumpRef = doc(db, "dumps", id);

    await updateDoc(dumpRef, {
      votes: currentVotes,
      upVoted,
      downVoted,
    });
  };

  useEffect(() => {
    updateVotes();
  }, [currentVotes, upVoted, downVoted]);
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-2 text-teal-50">
      <button
        onClick={() => {
          if (upVoted) return;
          setCurrentVotes((prev) => prev + 1);
          setUpVoted(true);
          setDownVoted(false);
        }}
      >
        <AiOutlineArrowUp />
      </button>
      <span
        className={
          currentVotes == 0
            ? ""
            : currentVotes < 0
            ? "text-red-400"
            : "text-green-400"
        }
      >
        {currentVotes}
      </span>
      <button
        onClick={() => {
          if (downVoted) return;
          setCurrentVotes((prev) => prev - 1);
          setDownVoted(true);
          setUpVoted(false);
        }}
      >
        <AiOutlineArrowDown />
      </button>
    </div>
  );
};

export default Votes;
