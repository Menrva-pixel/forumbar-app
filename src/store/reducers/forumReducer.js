import {
  FETCH_THREADS_SUCCESS,
  FETCH_THREADS_FAILURE,
  ADD_THREAD_SUCCESS,
  ADD_THREAD_FAILURE,
  VOTE_THREAD_SUCCESS,
  VOTE_THREAD_FAILURE,
  VOTE_COMMENT_SUCCESS,
  VOTE_COMMENT_FAILURE,
  SET_FILTER,
} from '../actions/forumActions';

const initialState = {
  threads: [],
  filteredThreads: [], 
  filter: '', 
  loading: false,
  error: null,
};

const forumReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_THREADS_SUCCESS:
      return {
        ...state,
        threads: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_THREADS_FAILURE:
    case ADD_THREAD_FAILURE:
    case VOTE_THREAD_FAILURE:
    case VOTE_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_THREAD_SUCCESS:
      return {
        ...state,
        threads: [...state.threads, action.payload],
        loading: false,
        error: null,
      };
    case VOTE_THREAD_SUCCESS:
      const updatedThreads = state.threads.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return { ...thread, votes: action.payload.votes };
        }
        return thread;
      });

      return {
        ...state,
        threads: updatedThreads,
        loading: false,
        error: null,
      };
    case VOTE_COMMENT_SUCCESS:
      const updatedComments = state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return { ...comment, votes: action.payload.votes };
        }
        return comment;
      });

      return {
        ...state,
        comments: updatedComments,
        loading: false,
        error: null,
      };
    case SET_FILTER:
      const filteredThreads = state.threads.filter((thread) =>
        action.payload === '' ? true : thread.category === action.payload
      );

      return {
        ...state,
        filteredThreads,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default forumReducer;
