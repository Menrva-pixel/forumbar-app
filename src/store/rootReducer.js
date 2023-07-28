import { combineReducers } from 'redux';
import authReducer from './reducers/authReducer';
import forumReducer from './reducers/forumReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  forum: forumReducer,
});

export default rootReducer;
