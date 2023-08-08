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
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const handleLike = async () => {
    try {
      if (!isLiked) {
        await axios.post(`https://forum-api.dicoding.dev/v1/threads/${threadId}/up-vote`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setIsLiked(true);
        setIsDisliked(false);
        setLikeCount((prevCount) => prevCount + 1); // Update like count
        if (isDisliked) setDislikeCount((prevCount) => prevCount - 1); // Update dislike count
      }
    } catch (error) {
      console.error('Failed to like thread:', error);
    }
  };

  const handleDislike = async () => {
    try {
      if (!isDisliked) {
        await axios.post(`https://forum-api.dicoding.dev/v1/threads/${threadId}/down-vote`, null, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        });
        setIsDisliked(true);
        setIsLiked(false);
        setDislikeCount((prevCount) => prevCount + 1); // Update dislike count
        if (isLiked) setLikeCount((prevCount) => prevCount - 1); // Update like count
      }
    } catch (error) {
      console.error('Failed to dislike thread:', error);
    }
  };

  const handleComment = async () => {
    // Implement your comment functionality here
    // You can show a modal or a form to let the user input the comment and send it to the API
  };

  const handleActionClick = (actionType) => {
    if (!isAuthenticated) {
      alert('Silahkan login terlebih dahulu');
      return;
    }

    switch (actionType) {
      case 'like':
        handleLike();
        break;
      case 'dislike':
        handleDislike();
        break;
      case 'share':
        // Implement your share functionality here
        break;
      default:
        break;
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

        // Set status like dan dislike dari API
        const userId = response.data.data.user?.id;
        setIsLiked(response.data.data.detailThread.upVotesBy.some((vote) => vote.userId === userId));
        setIsDisliked(response.data.data.detailThread.downVotesBy.some((vote) => vote.userId === userId));
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
              <button className={`action-button ${isLiked ? 'active' : ''}`} onClick={() => handleActionClick('like')}>
                Like ({likeCount})
              </button>
              <button
                className={`action-button ${isDisliked ? 'active' : ''}`}
                onClick={() => handleActionClick('dislike')}
              >
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
                <div className="comment-info">
                  <img src={comment.owner.avatar} alt={comment.owner.name} className="comment-avatar" />
                  <p className="comment-owner-name">{comment.owner.name}</p>
                  <p className="comment-date">Date: {new Date(comment.createdAt).toLocaleString()}</p>
                </div>
                <div className="comment-actions">
                  <button className={`action-button ${isLiked ? 'active' : ''}`} onClick={() => handleActionClick('like')}>
                    Like ({likeCount})
                  </button>
                  <button
                    className={`action-button ${isDisliked ? 'active' : ''}`}
                    onClick={() => handleActionClick('dislike')}
                  >
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
