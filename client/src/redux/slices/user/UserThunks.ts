import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../components/services/config';
import type { UserLoginType, UserSignUpType, UserType } from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserType>('user/checkUserThunk', async () => {
  const { data } = await apiService<UserType>('/user/check');
  return data;
});

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
