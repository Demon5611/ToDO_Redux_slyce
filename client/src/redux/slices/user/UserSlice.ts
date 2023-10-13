import { createSlice } from '@reduxjs/toolkit';
import type { UserLoadingType } from '../../../types/userTypes';
import {
  checkUserThunk,
  loginHandlerThunk,
  logoutHandlerThunk,
  signUpHandlerThunk,
} from './UserThunks';

type UserState = UserLoadingType;
const initialState: UserState = { status: 'loading' };

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState as UserState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkUserThunk.pending, (state) => ({ status: 'loading' }));
    builder.addCase(checkUserThunk.fulfilled, (state, action) => ({
      ...action.payload,
      status: 'logged',
    }));
    builder.addCase(checkUserThunk.rejected, (state) => ({
      status: 'guest',
    }));
    builder.addCase(signUpHandlerThunk.fulfilled, (state, action) => ({
      ...action.payload,
      status: 'logged',
    }));
    builder.addCase(signUpHandlerThunk.rejected, (state, action) => ({
      status: 'guest',
    }));
    builder.addCase(loginHandlerThunk.fulfilled, (state, action) => ({
      ...action.payload,
      status: 'logged',
    }));
    builder.addCase(loginHandlerThunk.rejected, (state, action) => ({
      status: 'guest',
    }));
    builder.addCase(logoutHandlerThunk.fulfilled, (state) => ({ status: 'guest' }));
  },
});

export default userSlice.reducer;
