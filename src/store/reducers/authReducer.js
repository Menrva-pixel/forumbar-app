import { REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  user: null, // Pastikan initialState memiliki properti 'user'
  token: null,
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
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload, // Pastikan menyimpan data user pada state
        token: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
