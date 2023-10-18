import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { addPostThunk } from '../../redux/slices/posts/PostsThunks';


export default function PostsForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({ name: '' });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter') {
  //     // Проверяем, что клавиша "Enter" нажата
  //     handleSend();
  //   }
  // };

  const handleSend = () => {
    void dispatch(addPostThunk(inputs));
    setInputs({ name: '' });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <TextField
        name="name"
        variant="outlined"
        placeholder="name"
        value={inputs.name}
        onChange={changeHandler}
        // onKeyPress={handleKeyPress} // Обработчик клавиши "Enter"
      />
      <br />
      <Button variant="outlined" size="large" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
}
