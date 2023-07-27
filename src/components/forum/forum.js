import React, { useState } from 'react';
import Post from './post';

const Forum = () => {
  const [posts, setPosts] = useState([]);

  const handlePostSubmit = (newPost) => {
    setPosts([...posts, newPost]);
  };

  return (
    <div>
      <h2>Forum</h2>
      <div>
        <Post onSubmit={handlePostSubmit} />
      </div>
      <div>
        {posts.map((post, index) => (
          <div key={index}>
            <p>{post}</p>
            { }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
