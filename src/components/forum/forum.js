import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, addThread, setFilter } from '../../store/actions/forumActions';
import axios from 'axios';
import '../../index.css';

const Forum = ({ threads, filteredThreads, filter, fetchThreads, addThread, setFilter }) => {
  const [newThread, setNewThread] = useState('');
  const [selectedThread, setSelectedThread] = useState(null); // State untuk menyimpan data detail thread

  useEffect(() => {
    fetchThreads();
  }, [fetchThreads]);

  const handleThreadSubmit = async () => {
    try {
      const response = await axios.post('https://forum-api.dicoding.dev/v1/threads', { title: newThread });
      addThread(response.data.data.thread);
      setNewThread('');
    } catch (error) {
      console.error('Failed to create thread:', error);
    }
  };

  const handleFilter = (category) => {
    setFilter(category);
  };

  const handleThreadClick = async (threadId) => {
    try {
      const response = await axios.get(`https://forum-api.dicoding.dev/v1/threads/${threadId}`);
      setSelectedThread(response.data.data.detailThread);
    } catch (error) {
      console.error('Failed to fetch thread details:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="title">Forum</h2>
      <div>
        <input type="text" value={newThread} onChange={(e) => setNewThread(e.target.value)} className="input" />
        <button onClick={handleThreadSubmit} className="button">Create Thread</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => handleFilter('')} className={`filter-button ${filter === '' ? 'active' : ''}`}>All</button>
        <button onClick={() => handleFilter('Technology')} className={`filter-button ${filter === 'Technology' ? 'active' : ''}`}>Technology</button>
        <button onClick={() => handleFilter('Lifestyle')} className={`filter-button ${filter === 'Lifestyle' ? 'active' : ''}`}>Lifestyle</button>
        <button onClick={() => handleFilter('Food')} className={`filter-button ${filter === 'Food' ? 'active' : ''}`}>Food</button>
      </div>
      <div>
        {filteredThreads.map((thread) => (
          <div key={thread.id}>
            <h3 onClick={() => handleThreadClick(thread.id)}>{thread.title}</h3>
          </div>
        ))}
      </div>
      {selectedThread && (
        <div>
          <h3>{selectedThread.title}</h3>
          <p>{selectedThread.body}</p>
          {/* render komponen */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  threads: state.forum.threads,
  filteredThreads: state.forum.filteredThreads,
  filter: state.forum.filter,
});

export default connect(mapStateToProps, { fetchThreads, addThread, setFilter })(Forum);
