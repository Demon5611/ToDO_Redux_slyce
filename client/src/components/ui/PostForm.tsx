import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addPostThunk } from '../../redux/slices/posts/PostsThunks';

export default function PostsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({ name: '' });

  // ловим изменения на поле ввода
  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        name="name"
        variant="outlined"
        placeholder="name"
        value={inputs.name}
        onChange={changeHandler}
      />
      <br />
      <Button
        variant="outlined"
        size="large"
        onClick={() => {
          void dispatch(addPostThunk(inputs));
          setInputs({ name: '' });
        }}
      >
        Send
      </Button>
    </Box>
  );
}
