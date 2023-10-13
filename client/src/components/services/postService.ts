import type { AxiosResponse } from 'axios';
import type { PostFormType, PostType } from '../../types/postTypes';
import apiService from './config';



// ручка отрисовки имеющихся постов
export const getPosts = async (): Promise<PostType[]> => {
  const { data } = await apiService.get<PostType[]>('/post/all');
  return data;
};
// подтвердить добавление  поста с формы
export const submitPost = async (formData: PostFormType): Promise<PostType> => {
  const { data } = await apiService.post<PostType>('/post/one', formData);
  return data;
};

export const deletePost = async (id: PostType['id']): Promise<AxiosResponse> =>
  apiService.delete(`/post/${id}`);


export const editPost = async (formData: PostFormType, id:PostType['id']): Promise<PostType> => {
  const { data } = await apiService.patch<PostType>(`/post/${id}`, formData);
  return data;
};



export const setCheckBoX = async (formData: PostFormType,  id:PostType['id']): Promise<PostType> => {
  const { data } = await apiService.patch<PostType>(`/post/newstatus/${id}/edit`, formData);
  return data;
};
