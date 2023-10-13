import { Button, Card, CardContent, Checkbox, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { deletePostThunk } from '../../redux/slices/posts/PostsThunks';
import type { PostType } from '../../types/postTypes';

type PostItemPropsType = {
  post: PostType;
};

export default function PostItem({ post }: PostItemPropsType): JSX.Element {
  const dispatch = useAppDispatch();

  // галочка в чек-бокс ????  добавить изм статуса

  const [checked, setChecked] = useState(false);
  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
    setChecked(event.target.checked);
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          <Checkbox
            checked={checked}
            onChange={handleCheckboxChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          {post?.name}
          <Button size="small" onClick={() => void dispatch(deletePostThunk({ id: post.id }))}>
            Delete
          </Button>
        </Typography>
      </CardContent>
    </Card>
  );
}
