import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginHandlerThunk, signUpHandlerThunk } from '../../redux/slices/user/UserThunks';
import type { UserLoginType, UserSignUpType } from '../../types/userTypes';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));

    const thunk =
      auth === 'signup'
        ? signUpHandlerThunk(formData as UserSignUpType)
        : loginHandlerThunk(formData as UserLoginType);

    void dispatch(thunk).then((res) => {
      if (
        (auth === 'signup' && signUpHandlerThunk.fulfilled.match(res)) ||
        (auth !== 'signup' && loginHandlerThunk.fulfilled.match(res))
      ) {
        navigate('/');
      }
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      component="form"
      onSubmit={submitHandler}
    >
      <p>Введите свои данные</p>
      <br />
      {auth === 'signup' && <TextField variant="outlined" name="username" label="username" />}
      <TextField sx={{ m: '1% 1%' }} variant="outlined" name="email" label="email" type="email" />
      <TextField variant="outlined" name="password" label="password" type="password" />
      <Button sx={{ m: '11% 1%' }} type="submit" variant="outlined" size="large">
        {auth === 'signup' ? 'Registration' : 'Login'}
      </Button>
    </Box>
  );
}
