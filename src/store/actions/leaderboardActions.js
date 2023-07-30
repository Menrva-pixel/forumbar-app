import axios from 'axios';

const API_URL = 'https://forum-api.dicoding.dev/v1'; 

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Actions
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// Thunk untuk fetching user ke leaderboard
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/leaderboards`);
    dispatch(fetchUsersSuccess(response.data.data.leaderboards));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};
