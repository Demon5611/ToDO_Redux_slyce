import {
  deletePost as deletePostService,
  editPost as editPostService,
  getPosts,
  submitPost,
} from '../../components/services/postService';
import type { PostFormType, PostType } from '../../types/postTypes';
import { addPost, deletePost, editPost, setCheckBox, setPost } from '../actions/PostsActions';
import type { AppThunk } from '../hooks';

// хендлер отрисовки всех постов
export const getPostsThunk = (): AppThunk => (dispatch) => {
  getPosts()
    .then((data) => dispatch(setPost(data)))
    .catch(console.log);
};
// добавление нового поста из формы
export const addPostThunk =
  (inputs: PostFormType): AppThunk =>
  (dispatch) => {
    submitPost(inputs)
      .then((data) => dispatch(addPost(data)))
      .catch(console.log);
  };

// редактирование
export const editPostThunk =
  (inputs: PostFormType, id: PostType['id']): AppThunk =>
  (dispatch) => {
    editPostService(inputs, id)
      .then((data) => dispatch(editPost(data)))
      .catch(console.log);
  };


// checkbox
export const updateStatusThunk =
  (inputs: PostFormType): AppThunk =>
  (dispatch) => {
    submitPost(inputs)
      .then((data) => dispatch(setCheckBox(data)))
      .catch(console.log);
  };

export const deletePostThunk =
  (id: PostType['id']): AppThunk =>
  (dispatch) => {
    deletePostService(id)
      .then(() => dispatch(deletePost(id)))
      .catch(console.log);
  };
