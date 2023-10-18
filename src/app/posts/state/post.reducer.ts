import { Action, createReducer, on } from '@ngrx/store';

import { PostModel } from '../../models/post.model';
import { PostStateType, PostType } from '../types/post.type';
import { addPost, removePost, updatePost } from './post.action';
import { initialState, PostsState } from './post.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state: PostsState, action: PostType): PostsState => {
    const newPost = { ...action.post };
    newPost.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, newPost],
    };
  }),
  on(updatePost, (state: PostsState, action: PostType): PostsState => {
    const updatedPosts = state.posts.map((data: PostModel) => {
      return data.id === action.post.id ? action.post : data;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(removePost, (state: PostsState, action: { id: string }): PostsState => {
    const deletedPosts = state.posts.filter((data: PostModel) => {
      return data.id !== action.id;
    });
    return {
      ...state,
      posts: deletedPosts,
    };
  }),
);

export const postsReducer = (state: PostStateType, action: Action) => {
  return _postsReducer(state, action);
};
