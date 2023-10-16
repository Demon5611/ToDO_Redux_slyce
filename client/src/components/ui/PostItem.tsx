import { Card, CardContent, Checkbox, Button, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { deletePostThunk } from '../../redux/slices/posts/PostsThunks';
import type { PostType } from '../../types/postTypes';

type PostItemPropsType = {
  post: PostType;
  onEditClick: () => void;
};

export default function PostItem({ post, onEditClick }: PostItemPropsType): JSX.Element {
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Checkbox
              checked={checked}
              onChange={handleCheckboxChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
              {post.name}
            </Typography>
          </Box>
          <Box>
            <Button size="small" onClick={() => void dispatch(deletePostThunk({ id: post.id }))}>
              Delete
            </Button>
            <Button size="small" onClick={onEditClick}>
              Edit
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
