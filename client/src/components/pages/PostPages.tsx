import Box from '@mui/material/Box';
import React, { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getPostsThunk } from '../../redux/slices/posts/PostsThunks';
import PostsForm from '../ui/PostForm';
import PostsList from '../ui/PostList';

export default function PostsPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getPostsThunk());
  }, []);

  return (
    <>
      <Box my={3}>
        <PostsForm />
      </Box>
      <PostsList />
    </>
  );
}
