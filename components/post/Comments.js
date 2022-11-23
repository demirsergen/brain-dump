import React, { useState } from 'react';
import Comment from './Comment';

const Comments = () => {
  const [comments, setComments] = useState([]);
  // TODOS
  // get comments from database and render under the post

  return (
    <div className="bg-red-100">
      {comments?.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
