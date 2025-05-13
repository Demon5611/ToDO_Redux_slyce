import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addPostThunk } from '../../redux/slices/posts/PostsThunks';

export default function PostsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState<{ name: string }>({ name: '' });

  const handleSend = (): void => {
    if (inputs.name.trim() === '') {
      alert('Вы ввели пустое значение в форму!');
      return;
    }
    void dispatch(addPostThunk({ name: inputs.name }));
    setInputs({ name: '' });
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        name="name"
        variant="outlined"
        placeholder="type your todo here.."
        value={inputs.name}
        onChange={changeHandler}
        onKeyPress={handleKeyPress}
      />
      <br />
      <Button variant="outlined" size="large" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
}
