import { Box, Button, Card, CardContent, Checkbox, Typography } from '@mui/material';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import locale from 'date-fns/locale/ru';
import React, { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { deletePostThunk, updateCheckBoxThunk } from '../../redux/slices/posts/PostsThunks';
import type { PostType } from '../../types/postTypes';

type PostItemPropsType = {
  post: PostType;
  onEditClick: () => void;
};

export default function PostItem({ post, onEditClick }: PostItemPropsType): JSX.Element {
  const createDate = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true, locale });
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState(false);
  const [isStriked, setIsStriked] = useState(false);

  const handleCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const newStatus = event.target.checked;
    setIsChecked(newStatus);
    setIsStriked(newStatus);
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Checkbox
              onChange={handleCheckboxChange}
              checked={isChecked}
              onClick={() => {
                void dispatch(
                  updateCheckBoxThunk({ formData: { id: post.id, status: isChecked } }),
                );
              }}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography
              sx={{
                fontSize: 16,
                cursor: 'pointer',
                textDecoration: isStriked ? 'line-through' : 'none',
              }}
              color="text.secondary"
              gutterBottom
            >
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
        {createDate}
      </CardContent>
    </Card>
  );
}
