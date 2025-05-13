import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { PostFormType, PostType } from '../../../types/postTypes';

export const getPostsThunk = createAsyncThunk<PostType[]>('posts/getPosts', async () => {
  const { data } = await apiService<PostType[]>('/post/all');
  return data;
});

export const addPostThunk = createAsyncThunk<PostType, PostFormType>(
  'posts/addPost',
  async (formData) => {
    const { data } = await apiService.post<PostType>('/post/one', formData);
    return data;
  },
);

export const updatePostThunk = createAsyncThunk<PostType, { name: string; id: number }>(
  'post/updatePost',
  async (inputs) => {
    const response = await apiService.patch<PostType>(`/post/${inputs.id}`, inputs);
    return response.data;
  },
);

// check-box
export const updateCheckBoxThunk = createAsyncThunk<PostType, { formData: PostFormType }>(
  'post/updateCheckBox',
  async ({ formData }) => {
    const res = await apiService.patch<PostType>(`/post/newstatus/${formData.id}`, formData);
    return res.data;
  },
);

export const deletePostThunk = createAsyncThunk<PostType['id'], { id: PostType['id'] }>(
  'posts/deletePost',
  async ({ id }) => {
    await apiService.delete(`/post/delete/${id}`);
    return id;
  },
);
