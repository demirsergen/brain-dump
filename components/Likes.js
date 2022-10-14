import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { db } from "../firebase";

const Likes = ({ likes, id }) => {
  const [currentLikes, setCurrentLikes] = useState(likes);

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
      <button onClick={() => setCurrentLikes((prev) => prev + 1)}>
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
      <button onClick={() => setCurrentLikes((prev) => prev - 1)}>
        <AiOutlineArrowDown />
      </button>
    </div>
  );
};

export default Likes;
