import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../index.css';

const DetailThread = ({ isAuthenticated }) => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const handleActionClick = (actionType) => {
    if (!isAuthenticated) {
      alert('Silahkan login terlebih dahulu');
      return;
    }
  };

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`https://forum-api.dicoding.dev/v1/threads/${threadId}`);
        setThread(response.data.data.detailThread);

        // Set jumlah like, dislike, share, dan komentar dari API
        setLikeCount(response.data.data.detailThread.upVotesBy.length);
        setDislikeCount(response.data.data.detailThread.downVotesBy.length);
        setShareCount(0);
        setCommentCount(response.data.data.detailThread.comments.length);
      } catch (error) {
        console.error('Failed to fetch thread details:', error);
      }
    };

    fetchThread();
  }, [threadId]);

  return (
    <div className="detail-thread-container">
      {thread ? (
        <div className="thread-details">
          <h2 className="thread-title">{thread.title}</h2>
          <p className="thread-body">{thread.body}</p>
          <div className="thread-info">
            <p className="thread-author">Posted by: {thread.owner.name}</p>
            <p className="thread-date">Date: {new Date(thread.createdAt).toLocaleString()}</p>
            <p className="thread-category">Category: {thread.category}</p>
            <div className="thread-actions">
              <button className="action-button" onClick={() => handleActionClick('like')}>
                Like ({likeCount})
              </button>
              <button className="action-button" onClick={() => handleActionClick('dislike')}>
                Dislike ({dislikeCount})
              </button>
              <button className="action-button" onClick={() => handleActionClick('share')}>
                Share ({shareCount})
              </button>
            </div>
          </div>
          <div className="comments">
            <h3>Comments ({commentCount}):</h3>
            {thread.comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p className="comment-content">{comment.content}</p>
                <p className="comment-info">
                  Posted by: {comment.owner.name} | Date: {new Date(comment.createdAt).toLocaleString()}
                </p>
                <div className="comment-actions">
                  <button className="action-button" onClick={() => handleActionClick('like')}>
                    Like ({likeCount})
                  </button>
                  <button className="action-button" onClick={() => handleActionClick('dislike')}>
                    Dislike ({dislikeCount})
                  </button>
                  <button className="action-button" onClick={() => handleActionClick('share')}>
                    Share ({shareCount})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Loading thread...</p>
      )}
    </div>
  );
};

export default DetailThread;
