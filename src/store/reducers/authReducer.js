import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: localStorage.getItem('userToken'), 
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_SUCCESS:
      // Save token to localStorage and update state
      localStorage.setItem('userToken', action.payload);
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        token: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false, 
        token: null,
        error: action.payload,
      };
    case LOGOUT:
      // Clear token from localStorage on logout
      localStorage.removeItem('userToken');
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
