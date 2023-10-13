import { configureStore } from '@reduxjs/toolkit';
import PostsReducer from './slices/posts/PostsSlice';
import userReducer from './slices/user/UserSlice';

export const store = configureStore({
  reducer: {
    posts: PostsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // типизируем наш стейт
export type AppDispatch = typeof store.dispatch; // типизируем наш диспатч
