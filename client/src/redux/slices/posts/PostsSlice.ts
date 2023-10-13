import { createSlice } from '@reduxjs/toolkit';
import type { PostType } from '../../../types/postTypes';
import { addPostThunk, deletePostThunk, getPostsThunk, updatePostThunk } from './PostsThunks';

type PostsState = PostType[];
const initialState: PostsState = [];

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPostsThunk.fulfilled, (state, action) => action.payload);
    builder.addCase(getPostsThunk.rejected, (state, action) => []);

    builder.addCase(addPostThunk.fulfilled, (state, action) => [action.payload, ...state]);
    builder.addCase(addPostThunk.rejected, (state, action) => state);

    builder.addCase(deletePostThunk.fulfilled, (state, action) =>
      state.filter((el) => el.id !== action.payload),
    );
    builder.addCase(deletePostThunk.rejected, (state, action) => state);

    builder.addCase(updatePostThunk.fulfilled, (state, action) => {
      const index = state.findIndex(el=>el.id===action.payload.id)
      state[index] = action.payload
    })
  },
});

export default postsSlice.reducer;
