import React from "react";
import Image from "next/image";
import Link from "next/link";

const Dump = ({ dump }) => {
  return (
    <div className="bg-slate-500 my-2 rounded p-2 grow">
      <div className="flex gap-2">
        <Link href="/profile">
          <Image
            src={dump?.avatar}
            alt="avatar"
            width={20}
            height={20}
            className="rounded-full cursor-pointer"
          />
        </Link>
        <h1 className="text-teal-50">{dump.username}</h1>
      </div>
      <div className="bg-gray-100 rounded p-2 my-2">
        <p>{dump.text}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-teal-50">#{dump.tag}</span>
        <span className="text-teal-50 underline">
          {dump.updated ? "Edited" : null}
        </span>
      </div>
    </div>
  );
};

export default Dump;
