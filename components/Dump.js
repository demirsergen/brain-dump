import React from "react";
import Image from "next/image";

const Dump = ({ dump }) => {
  const timestamp = dump.timestamp.seconds;
  return (
    <div className="bg-slate-500 my-2 rounded p-2">
      <div className="flex gap-2">
        <Image
          src={dump.avatar}
          alt="avatar"
          width={20}
          height={20}
          className="rounded-full"
        />
        <h1 className="text-teal-50">{dump.username}</h1>
      </div>
      <div className="bg-gray-100 rounded p-2 my-2">
        <p>{dump.text}</p>
      </div>
      <span>#{dump.tag}</span>
    </div>
  );
};

export default Dump;
