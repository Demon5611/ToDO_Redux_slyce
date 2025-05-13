/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createSlice } from '@reduxjs/toolkit';
import {
  checkUserThunk,
  loginHandlerThunk,
  logoutHandlerThunk,
  signUpHandlerThunk,
  upDateHandlerThunk,
} from './UserThunks';

export type UserBase = {
  id: number;
  username: string;
  email: string;
};

export type UserState =
  | { status: 'loading' }
  | { status: 'guest' }
  | (UserBase & { status: 'logged' });

const initialState: UserState = { status: 'loading' };

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserThunk.pending, (_state) => ({ status: 'loading' }));
    builder.addCase(checkUserThunk.fulfilled, (_state, action) => ({
      ...action.payload,
      status: 'logged',
    }));
    builder.addCase(checkUserThunk.rejected, (_state) => ({
      status: 'guest',
    }));
    builder.addCase(signUpHandlerThunk.fulfilled, (_state, action) => ({
      ...action.payload,
      status: 'logged',
    }));
    builder.addCase(signUpHandlerThunk.rejected, (_state, _action) => ({
      status: 'guest',
    }));
    builder.addCase(loginHandlerThunk.fulfilled, (_state, action) => ({
      ...action.payload,
      status: 'logged',
    }));
    builder.addCase(loginHandlerThunk.rejected, (_state, _action) => ({
      status: 'guest',
    }));
    builder.addCase(logoutHandlerThunk.fulfilled, (_state) => ({ status: 'guest' }));
    builder.addCase(upDateHandlerThunk.fulfilled, (_state, action) => ({
      ...action.payload,
      status: 'logged',
    }));
    builder.addCase(upDateHandlerThunk.rejected, (_state) => ({ status: 'guest' }));
  },
});

export default userSlice.reducer;
