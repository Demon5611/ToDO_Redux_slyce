import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkUser, userLogin, userLogout, userSignUp } from '../../../components/services/userService';
import type { UserLoginType, UserSignUpType, UserType } from '../../../types/userTypes';

export const checkUserThunk = createAsyncThunk<UserType>('user/checkUserThunk', () => checkUser());

export const loginHandlerThunk = createAsyncThunk<UserType, UserLoginType>(
  'user/loginHandlerThunk',
  (formData) => userLogin(formData),
);

export const signUpHandlerThunk = createAsyncThunk<UserType, UserSignUpType>(
  'user/signUpHandlerThunk',
  (formData) => userSignUp(formData),
);

export const logoutHandlerThunk = createAsyncThunk('user/logoutHandlerThunk', () =>
  userLogout().then(() => undefined),
);
