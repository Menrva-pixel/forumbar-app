import axios from 'axios';

const API_URL = 'https://forum-api.dicoding.dev/v1';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Actions
export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

// Thunk to register user
export const register = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    dispatch(registerSuccess(response.data.data.user));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

// Thunk to login user
export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: email,
      password: password,
    });
    dispatch(loginSuccess(response.data.data.token));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};
