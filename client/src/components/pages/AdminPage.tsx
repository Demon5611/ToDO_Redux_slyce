import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { upDateHandlerThunk } from '../../redux/slices/user/UserThunks';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

export default function AdminPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const initialValues: FormValues = {
    username: user.username,
    email: user.email,
    password: user.password,
  };

  const [formValues, setFormValues] = useState<FormValues>(initialValues);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await dispatch(upDateHandlerThunk(formValues));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mt: -30, // Поднятие всех карточек на 30px вверх
        height: '100vh',
      }}
    >
      <Paper elevation={9} sx={{ width: '50%', mb: 2 }}>
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            height: '50%',
            margin: '0 15%',
            width: '80%',
            mt: 2,
            ml: 6,
            mb: 2,
          }}
        >
          Можете изменить регистрационные данные в этой форме
        </Typography>
      </Paper>

      <form onSubmit={handleSubmit} sx={{ width: '50%' }}>
        <TextField
          label="Name"
          name="username"
          value={formValues.username}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mb: 2, width: '100%' }}
        />

        <TextField
          label="Email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          variant="outlined"
          sx={{ mb: 2, width: '100%' }}
        />

        <TextField
          label="Password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          variant="outlined"
          type="password"
          sx={{ mb: 2, width: '100%' }}
        />

        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </Box>
  );
}
