import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'https://forum-api.dicoding.dev/v1';

// Action types for fetching threads
export const FETCH_THREADS_SUCCESS = 'FETCH_THREADS_SUCCESS';
export const FETCH_THREADS_FAILURE = 'FETCH_THREADS_FAILURE';
export const ADD_THREAD_SUCCESS = 'ADD_THREAD_SUCCESS';
export const ADD_THREAD_FAILURE = 'ADD_THREAD_FAILURE';

// Action creators for fetching threads
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

// Thunk for fetching threads
export const fetchThreads = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/threads`);
      const threads = response.data.data.threads;
      dispatch(fetchThreadsSuccess(threads));
    } catch (error) {
      dispatch(fetchThreadsFailure(error.message));
    }
  };
};

// Thunk for adding thread
export const addThread = (thread) => {
  return { type: ADD_THREAD_SUCCESS, payload: thread };
};

// Action types and creators for voting
export const VOTE_THREAD_SUCCESS = 'VOTE_THREAD_SUCCESS';
export const VOTE_THREAD_FAILURE = 'VOTE_THREAD_FAILURE';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_FAILURE = 'VOTE_COMMENT_FAILURE';

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

// Thunk for voting thread
export const voteThread = (threadId, voteType) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${API_URL}/threads/${threadId}/votes`, { voteType }, { headers });
    dispatch(voteThreadSuccess(threadId, response.data.data.votes));
  } catch (error) {
    dispatch(voteThreadFailure(error.message));
  }
};

// Thunk for voting comment
export const voteComment = (commentId, voteType) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${API_URL}/comments/${commentId}/votes`, { voteType }, { headers });
    dispatch(voteCommentSuccess(commentId, response.data.data.votes));
  } catch (error) {
    dispatch(voteCommentFailure(error.message));
  }
};

// Action type and creator for setting filter
export const SET_FILTER = 'SET_FILTER';

export const setFilter = (category) => ({
  type: SET_FILTER,
  payload: category,
});

// ... (other actions if any)

// Export all action creators
export default {
  fetchThreads,
  addThread,
  voteThread,
  voteComment,
  setFilter,
};
