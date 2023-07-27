import React, { useState } from 'react';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  const handlePostSubmit = () => {
   
  };

  return (
    <div>
      <h2>Forum</h2>
      <div>
        <textarea rows="4" cols="50" value={newPost} onChange={(e) => setNewPost(e.target.value)} />
        <button onClick={handlePostSubmit}>Post</button>
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

export default Post;
