import axios from 'axios';

const API_URL = 'https://forum-api.dicoding.dev/v1';

export const FETCH_THREADS_SUCCESS = 'FETCH_THREADS_SUCCESS';
export const FETCH_THREADS_FAILURE = 'FETCH_THREADS_FAILURE';
export const ADD_THREAD_SUCCESS = 'ADD_THREAD_SUCCESS';
export const ADD_THREAD_FAILURE = 'ADD_THREAD_FAILURE';

export const fetchThreadsSuccess = (threads) => ({
  type: FETCH_THREADS_SUCCESS,
  payload: threads,
});

export const fetchThreadsFailure = (error) => ({
  type: FETCH_THREADS_FAILURE,
  payload: error,
});

export const addThreadSuccess = (thread) => ({
  type: ADD_THREAD_SUCCESS,
  payload: thread,
});

export const addThreadFailure = (error) => ({
  type: ADD_THREAD_FAILURE,
  payload: error,
});

// Thunk untuk mengambil data Threads
export const fetchThreads = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('https://forum-api.dicoding.dev/v1/threads');
      const threads = response.data.data.threads;
      dispatch({ type: FETCH_THREADS_SUCCESS, payload: threads });
    } catch (error) {
      dispatch({ type: FETCH_THREADS_FAILURE, payload: error.message });
    }
  };
};

// Thunk untuk mebambahkanThread
export const addThread = (thread) => {
  return { type: ADD_THREAD_SUCCESS, payload: thread };
};


// Action untuk Vote
export const VOTE_THREAD_SUCCESS = 'VOTE_THREAD_SUCCESS';
export const VOTE_THREAD_FAILURE = 'VOTE_THREAD_FAILURE';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE';

// Action Creator untuk Vote
export const voteThreadSuccess = (threadId, votes) => ({
  type: VOTE_THREAD_SUCCESS,
  payload: { threadId, votes },
});

export const voteThreadFailure = (error) => ({
  type: VOTE_THREAD_FAILURE,
  payload: error,
});

export const voteCommentSuccess = (commentId, votes) => ({
  type: VOTE_COMMENT_SUCCESS,
  payload: { commentId, votes },
});

export const voteCommentFailure = (error) => ({
  type: VOTE_COMMENT_FAILURE,
  payload: error,
});

// Thunk untuk Vote Thread
export const voteThread = (threadId, voteType) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/threads/${threadId}/votes`, { voteType });
    dispatch(voteThreadSuccess(threadId, response.data.data.votes));
  } catch (error) {
    dispatch(voteThreadFailure(error.message));
  }
};

// Thunk untuk Vote Comment
export const voteComment = (commentId, voteType) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/comments/${commentId}/votes`, { voteType });
    dispatch(voteCommentSuccess(commentId, response.data.data.votes));
  } catch (error) {
    dispatch(voteCommentFailure(error.message));
  }
};

// Action untuk filter
export const SET_FILTER = 'SET_FILTER';

export const setFilter = (category) => ({
  type: SET_FILTER,
  payload: category,
});
