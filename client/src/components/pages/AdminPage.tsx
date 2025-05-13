import React, { useState } from 'react';
import { Box, Button, FormControl, Paper, TextField, Typography } from '@mui/material';
import type { ChangeEvent, FormEvent } from 'react';
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

  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    email: '',
    password: '',
  });

  // Заполняем форму данными пользователя, когда они становятся доступны
  React.useEffect(() => {
    if (user.status === 'logged') {
      setFormValues({
        username: user.username,
        email: user.email,
        password: '',
      });
    }
  }, [user]);

  if (user.status !== 'logged') {
    return <Typography>Доступ запрещён</Typography>;
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();
    const res = await dispatch(upDateHandlerThunk({ ...formValues, id: user.id }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Paper elevation={9} sx={{ width: '50%', mb: 2 }}>
        <Typography sx={{ textAlign: 'center', mt: 2, mb: 2 }}>
          Можете изменить регистрационные данные в этой форме
        </Typography>
      </Paper>

      <form onSubmit={(e) => void handleSubmit(e)} style={{ width: '50%' }}>
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
