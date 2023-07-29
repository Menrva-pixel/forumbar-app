import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchThreads, addThread, setFilter } from '../../store/actions/forumActions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../index.css';

const Forum = ({ threads, filteredThreads, filter, fetchThreads, addThread, setFilter }) => {
  const [newThread, setNewThread] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadCategory, setNewThreadCategory] = useState('');
  const [newThreadBody, setNewThreadBody] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchThreads();
    fetchCategories();
    checkAuthentication();
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://forum-api.dicoding.dev/v1/categories');
      setCategories(response.data.data.categories.map((category) => category.name));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
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

  const checkAuthentication = async () => {
    try {
      const response = await axios.get('https://forum-api.dicoding.dev/v1/check-auth');
      setIsAuthenticated(response.data.data.authenticated);
    } catch (error) {
      console.error('Failed to check authentication status:', error);
    }
  };

  const handleCreateThread = () => {
    if (!newThreadTitle || !newThreadCategory || !newThreadBody) {
      alert('Harap isi semua kolom.');
      return;
    }

    const createThread = async () => {
      try {
        const response = await axios.post('https://forum-api.dicoding.dev/v1/threads', {
          title: newThreadTitle,
          category: newThreadCategory,
          body: newThreadBody,
        });
        addThread(response.data.data.thread);
        setShowModal(false);
        setNewThreadTitle('');
        setNewThreadCategory('');
        setNewThreadBody('');
      } catch (error) {
        console.error('Failed to create thread:', error);
      }
    };

    createThread();
  };

  return (
    <div className="container">
      <h2 className="title">Forum</h2>
      <div>
        {/*{isAuthenticated && (*/}
          <button onClick={() => setShowModal(true)} className="button">Create Thread</button>
        {/*)}*/}
      </div>
      <div className="filter-buttons">
        <button onClick={() => handleFilter('')} className={`filter-button ${filter === '' ? 'active' : ''}`}>All</button>
        {categories.map((category) => (
          <button key={category} onClick={() => handleFilter(category)} className={`filter-button ${filter === category ? 'active' : ''}`}>
            {category}
          </button>
        ))}
      </div>
      <div>
        {threads.map((thread) => (
          <div key={thread.id}>
            <Link to={`/thread/${thread.id}`}>
              <h3>{thread.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      {selectedThread && (
        <div>
          <h3>{selectedThread.title}</h3>
          <p>{selectedThread.body}</p>
          <p>Category: {selectedThread.category}</p>
          <p>Created By: {selectedThread.creator.name}</p>
          <p>Created At: {new Date(selectedThread.createdAt).toLocaleString()}</p>
          <p>Likes: {selectedThread.upVotesBy.length}</p>
          <p>Dislikes: {selectedThread.downVotesBy.length}</p>
          <p>Shares: {selectedThread.shared}</p>
          <p>Comments: {selectedThread.comments.length}</p>
        </div>
      )}

      {/* Modal untuk pembuatan thread baru */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Create New Thread</h2>
            <input
              type="text"
              placeholder="Title"
              value={newThreadTitle}
              onChange={(e) => setNewThreadTitle(e.target.value)}
              className="input"
            />
            <input
              type="text"
              placeholder="Category"
              value={newThreadCategory}
              onChange={(e) => setNewThreadCategory(e.target.value)}
              className="input"
            />
            <textarea
              placeholder="Content"
              value={newThreadBody}
              onChange={(e) => setNewThreadBody(e.target.value)}
              className="input"
              rows="6"
            ></textarea>
            <div className="modal-buttons">
              <button onClick={handleCreateThread} className="button">
                Create
              </button>
              <button onClick={() => setShowModal(false)} className="button cancel">
                Cancel
              </button>
            </div>
          </div>
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
