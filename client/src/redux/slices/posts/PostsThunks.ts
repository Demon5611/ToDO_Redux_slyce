import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../components/services/config';

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
export const updateCheckBoxThunk = createAsyncThunk<
PostType,
{ formData: PostFormType; id: PostType['id'] }
>('post/updateCheckBox', (formData) =>
apiService.patch<PostType>(`/post/newstatus/${formData.id}`, formData).then((res) => res.data),
);


export const deletePostThunk = createAsyncThunk<PostType['id'], { id: PostType['id'] }>(
  'posts/deletePost',
  async ({ id }) => {
    await apiService.delete(`/post/${id}`);
    return id;
  },
);

// или так или
// export const updatePostThunk = createAsyncThunk<PostType, { inputs: PostFormType; id: PostType['id'] }>('posts/updatePost', (inputs) =>
//   apiService.patch<PostType>(`/posts/${inputs.id}`, inputs).then((res) => res.data),
// );

// или так
// export const updatePostThunk = createAsyncThunk<
//   PostType,
//   { title: string; body: string; id: number }
// >('posts/updatePost', async (inputs) => {
//   const response = await apiService.patch<PostType>(`/posts/${inputs.id}`, inputs);
//   return response.data; // Возвращаем обновленные данные с сервера
// });
