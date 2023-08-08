import axios from 'axios';
import Swal from 'sweetalert2';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registerSuccess = (user) => ({
  type: REGISTER_SUCCESS,
  payload: user,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://forum-api.dicoding.dev/v1/register', {
      name,
      email,
      password,
    });
    const { user } = response.data.data;
    dispatch(registerSuccess(user));
    Swal.fire({
      icon: 'success',
      title: 'Registration Success',
      text: 'You have successfully registered.',
    });
  } catch (error) {
    dispatch(registerFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Registration Failed',
      text: error.message,
    });
  }
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (token) => ({
  type: LOGIN_SUCCESS,
  payload: token,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('https://forum-api.dicoding.dev/v1/login', {
      email,
      password,
    });
    const { token } = response.data.data;
    dispatch(loginSuccess(token));
    
    localStorage.setItem('userToken', token);
    Swal.fire({
      icon: 'success',
      title: 'Login Success',
      text: 'You have successfully logged in.',
    });
  } catch (error) {
    dispatch(loginFailure(error.message));
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: error.message,
    });
  }
};

// Tambahkan action untuk logout user
export const logoutUser = () => (dispatch) => {
  try {
    localStorage.removeItem('userToken');
    dispatch(logout());
    Swal.fire({
      icon: 'info',
      title: 'Logout Success',
      text: 'You have successfully logged out.',
    });
  } catch (error) {
    console.error('Failed to logout user:', error);
  }
};
