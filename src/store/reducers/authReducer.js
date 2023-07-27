// store/reducers/authReducer.js
const initialState = {
    isAuthenticated: false,
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      // Implement your login and register cases here
      default:
        return state;
    }
  };
  
  export default authReducer;
  