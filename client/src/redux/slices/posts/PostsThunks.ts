import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deletePost as deletePostService,
  getPosts,
  submitPost,
} from '../../../components/services/postService';
import type { PostFormType, PostType } from '../../../types/postTypes';

export const getPostsThunk = createAsyncThunk<PostType[]>('posts/getPostsThunk', async () =>
  getPosts(),
);

export const addPostThunk = createAsyncThunk<PostType, PostFormType>(
  'posts/addPostThunk',
  async (formData) => submitPost(formData),
);

export const updatePostThunk = createAsyncThunk<PostType, PostType>(
  'posts/updatePost',
  (formData) => axios.patch<PostType>(`/posts/${formData.id}`, formData).then((res) => res.data),
);

export const deletePostThunk = createAsyncThunk<PostType['id'], { id: PostType['id'] }>(
  'posts/deletePostThunk',
  async ({ id }) => deletePostService(id),
);
