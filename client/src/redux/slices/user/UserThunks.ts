import { createAsyncThunk } from '@reduxjs/toolkit';
import apiService from '../../../services/config';
import type { UserLoginType, UserSignUpType, UserType } from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserType>('user/checkUserThunk', async () => {
  const { data } = await apiService<UserType>('/user/check');
  return data;
});
// проверка наличия куки пользователя. браузер запомнит и сразу авторизует
export const loginHandlerThunk = createAsyncThunk<UserType, UserLoginType>(
  'user/loginHandlerThunk',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await apiService.post<UserType>('/user/login', formData);
      return { ...data, status: 'logged' };
    } catch (error) {
      return rejectWithValue('Login failed');
    }
  },
);

export const signUpHandlerThunk = createAsyncThunk<UserType, UserSignUpType>(
  'user/signUpHandlerThunk',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await apiService.post<UserType>('/user/signup', formData);
      return { ...data, status: 'logged' };
    } catch (error) {
      return rejectWithValue('Signup failed');
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
  async (formValues, { rejectWithValue }) => {
    if (formValues.id === undefined || typeof formValues.id !== 'number') {
      return rejectWithValue('Invalid user ID');
    }

    try {
      const { data } = await apiService.patch<UserType>(
        `/user/update/${formValues.id}`,
        formValues,
      );

      return { ...data, status: 'logged' };
    } catch (error) {
      console.error('Error updating data:', error);
      return rejectWithValue('Update failed');
    }
  },
);
