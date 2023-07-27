// store/reducers/forumReducer.js
const initialState = {
    posts: [],
  };
  
  const forumReducer = (state = initialState, action) => {
    switch (action.type) {
      // Implement your add post, add comment, and add like cases here
      default:
        return state;
    }
  };
  
  export default forumReducer;
  