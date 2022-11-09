import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { auth } from "../firebase";

const Votes = ({ currentVoteCount, id, post, onVote }) => {
  const [currentVotes, setCurrentVotes] = useState(currentVoteCount);
  const [user] = useAuthState(auth);

  return (
    <div className="flex flex-col items-center justify-center p-2 gap-2 text-teal-50">
      <button onClick={() => onVote(post.id, 1, user.uid)}>
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
      <button onClick={() => onVote(post.id, -1, user.uid)}>
        <AiOutlineArrowDown />
      </button>
    </div>
  );
};

export default Votes;
