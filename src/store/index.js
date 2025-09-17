import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import postsReducer from './postsSlice';
import todosReducer from './todosSlice';
import photosReducer from './photosSlice';

const store = configureStore({
  reducer: {
  users: usersReducer,   
  posts: postsReducer,   
  todos: todosReducer,   
  photos: photosReducer, 
  },
});

export default store;
