import { Button } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import type { PostType } from '../../types/postTypes';
import ModalPost from './ModalPostEdit';
import PostItem from './PostItem';

export default function PostsList(): JSX.Element {
  // модалка=====================================
  const post = useAppSelector((store) => store.posts);
  const [isOpen, setIsOpen] = useState(false);
  const [selectPost, setSelectPost] = useState<PostType | null>(null);

  // открыть модалку
  const handleOpen = (post: PostType): void => {
    setSelectPost(post);
    setIsOpen(true);
  };
  // закрыть модалку
  const handleClose = (): void => {
    setIsOpen(false);
  };

  return (
    <div>
      {post?.map((el) => (
        <div key={el.id}>
          <PostItem post={el} />
          <Button onClick={() => handleOpen(el)}>Edit</Button>
        </div>
      ))}
      {selectPost && <ModalPost isOpen={isOpen} post={selectPost} onClose={handleClose} />}
    </div>
  );
}
