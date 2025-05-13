import React, { useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import type { PostType } from '../../types/postTypes';
import ModalPost from './ModalPostEdit';
import PostItem from './PostItem';

export default function PostsList(): JSX.Element {
  const posts = useAppSelector((store) => store.posts);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  const handleOpen = (post: PostType): void => {
    setSelectedPost(post);
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setSelectedPost(null);
    setIsOpen(false);
  };

  return (
    <div>
      {posts?.map((el) => (
        <div key={el.id}>
          <PostItem post={el} onEditClick={() => handleOpen(el)} />
        </div>
      ))}
      {selectedPost && <ModalPost isOpen={isOpen} post={selectedPost} onClose={handleClose} />}
      <p>* Отображаются посты только, принадлежащие автору</p>
    </div>
  );
}
