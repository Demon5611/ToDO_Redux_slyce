import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../components/services/config';
import type { UserLoginType, UserSignUpType, UserType } from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserType>('user/checkUserThunk', async () => {
  const { data } = await apiService<UserType>('/user/check');
  return data;
});
// проверка наличия куки пользователя. браузер запомнит и сразу авторизует
export const loginHandlerThunk = createAsyncThunk<UserType, UserLoginType>(
  'user/loginHandlerThunk',
  async (formData) => {
    try {
      const { data } = await apiService.post<UserType>('/user/login', formData);
      return { ...data, status: 'logged' };
    } catch (error) {
      return { status: 'guest' };
    }
  },
);

export const signUpHandlerThunk = createAsyncThunk<UserType, UserSignUpType>(
  'user/signUpHandlerThunk',
  async (formData) => {
    try {
      const { data } = await apiService.post<UserType>('/user/signup', formData);
      return { ...data, status: 'logged' };
    } catch (error) {
      return { status: 'guest' };
    }
  },
);

export const logoutHandlerThunk = createAsyncThunk('user/logoutHandlerThunk', async () => {
  try {
    await apiService('/user/logout');
    return { status: 'guest' };
  } catch (error) {
    return { status: 'guest' };
  }
});

export const upDateHandlerThunk = createAsyncThunk<UserType, UserType>(
  'user/upDateHandlerThunk',
  async (formValues) => {
    if (formValues.id === undefined || typeof formValues.id !== 'number') {
      throw new Error('Invalid user ID');
    }
    try {
      await apiService.patch(`/auth/update/${formValues.id}`, formValues);
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data upDateHandlerThunk===>:', error);
    }
  },
);
