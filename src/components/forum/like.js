import React, { useState } from 'react';

const Like = () => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <p>{likes} Likes</p>
    </div>
  );
};

export default Like;
