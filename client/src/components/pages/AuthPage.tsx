import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { loginHandlerThunk, signUpHandlerThunk } from '../../redux/slices/user/UserThunks';
import type { UserLoginType, UserSignUpType } from '../../types/userTypes';

export default function AuthPage(): JSX.Element {
  const { auth } = useParams();
  const dispatch = useAppDispatch();

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    return auth === 'signup'
      ? void dispatch(signUpHandlerThunk(formData as UserSignUpType))
      : void dispatch(loginHandlerThunk(formData as UserLoginType));
  };


  
  return (
    <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      mt: -10, 
      height: '100vh',   

    }}
      component="form"
      onSubmit={submitHandler}
    > <p>Введите свои данные</p>
      <br/>
      {auth === 'signup' &&          
      <TextField variant="outlined" name="username" label="username" />}
      <TextField sx={{m:"1% 1%"}}  variant="outlined" name="email" label="email" type="email" />
      <TextField variant="outlined" name="password" label="password" type="password" />
      <Button sx={{m:"1% 1%"}} type="submit" variant="outlined" size="large">
        {auth === 'signup' ? 'Sign Up' : 'Login'}
      </Button>
    </Box>
  );
}
