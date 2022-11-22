import React from 'react';
import { Link } from 'next/link';

const CommentButton = () => {
  return (
    <div className="flex items-center justify-start">
      <button className="bg-teal-500 p-2 rounded text-teal-50 text-sm">
        Comment
      </button>
    </div>
  );
};

export default CommentButton;
