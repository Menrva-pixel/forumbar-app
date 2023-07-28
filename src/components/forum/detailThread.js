import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DetailThread = () => {
  const { threadId } = useParams();
  const [thread, setThread] = useState(null);

  useEffect(() => {
    const fetchThread = async () => {
      try {
        const response = await axios.get(`https://forum-api.dicoding.dev/v1/threads/${threadId}`);
        setThread(response.data.data.detailThread);
      } catch (error) {
        console.error('Failed to fetch thread details:', error);
      }
    };

    fetchThread();
  }, [threadId]);

  return (
    <div>
      {thread ? (
        <div>
          <h3>{thread.title}</h3>
          <p>{thread.body}</p>
          {/* bagian render */}
        </div>
      ) : (
        <p>Loading thread...</p>
      )}
    </div>
  );
};

export default DetailThread;
