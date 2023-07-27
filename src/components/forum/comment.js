import React, { useState } from 'react';

const Comment = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    
  };

  return (
    <div>
      <div>
        <textarea rows="2" cols="40" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button onClick={handleCommentSubmit}>Comment</button>
      </div>
      <div>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default Comment;
