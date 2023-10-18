import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { updatePostThunk } from '../../redux/slices/posts/PostsThunks';
import type { PostType } from '../../types/postTypes';

type ModalPostEdit = {
  isOpen: boolean;
  post: PostType;
  onClose: () => void;
};

const modalStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const paperStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  width: '50%',
  boxShadow: '24px',
  p: '2%', // Внутренние отступы 2% по всем сторонам
  m: '10%', // Отступы по краям от рамки 10%
};

export default function ModalPost({ isOpen, post, onClose }: ModalPostEdit): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputs, setInputs] = useState({ name: post.name });

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={modalStyle}
    >
      <Box style={paperStyle}>
        <TextField
          fullWidth
          name="name"
          variant="outlined"
          margin="normal"
          placeholder="input text"
          value={inputs.name}
          onChange={changeHandler}
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="outlined"
            size="large"
            onClick={async () => {
              void dispatch(updatePostThunk({ name: inputs.name, id: post.id }));
              setInputs({ name: '' }); // очистили
              onClose();
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
