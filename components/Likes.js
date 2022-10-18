import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { db } from "../firebase";

const Likes = ({ likes, id }) => {
  // Disable or toggle like button after voting
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);

  const updateLikes = async () => {
    const dumpRef = doc(db, "dumps", id);

    await updateDoc(dumpRef, {
      likes: currentLikes,
    });
  };

  useEffect(() => {
    updateLikes();
  }, [currentLikes]);
  return (
    <div className="flex flex-col items-center justify-center p-2 gap-2 text-teal-50">
      <button
        onClick={() => {
          if (upVoted) return;
          if (downVoted) {
            setCurrentLikes((prev) => prev + 1);
            setDownVoted(false);
            return;
          }
          setCurrentLikes((prev) => prev + 1);
          setUpVoted(true);
        }}
      >
        <AiOutlineArrowUp />
      </button>
      <span
        className={
          currentLikes == 0
            ? ""
            : currentLikes < 0
            ? "text-red-400"
            : "text-green-400"
        }
      >
        {currentLikes}
      </span>
      <button
        onClick={() => {
          if (downVoted) return;
          if (upVoted) {
            setCurrentLikes((prev) => prev - 1);
            setUpVoted(false);
            return;
          }
          setCurrentLikes((prev) => prev - 1);
          setDownVoted(true);
        }}
      >
        <AiOutlineArrowDown />
      </button>
    </div>
  );
};

export default Likes;
