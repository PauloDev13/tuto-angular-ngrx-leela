import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { PostModel } from '../../models/post.model';
import { PostStateType } from '../types/post.type';
import {
  addPostSuccess,
  loadPostSuccess,
  removePost,
  updatePostSuccess,
} from './post.action';
import { initialState, PostsState } from './post.state';

const _postsReducer: ActionReducer<PostsState> = createReducer(
  initialState,
  on(loadPostSuccess, (state: PostsState, { posts }): PostsState => {
    return {
      ...state,
      posts,
    };
  }),

  on(
    addPostSuccess,
    (state: PostsState, action: { post: PostModel }): PostsState => {
      const newPost = { ...action.post };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    },
  ),

  on(updatePostSuccess, (state: PostsState, { post }): PostsState => {
    const updatedPosts: Array<PostModel> = state.posts.map(
      (data: PostModel) => {
        console.log('REDUCER POST', data.id);
        return data.id === post.id ? post : data;
      },
    );
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(
    removePost,
    (state: PostsState, action: { id: string | undefined }): PostsState => {
      const deletedPosts: PostModel[] = state.posts.filter(
        (data: PostModel) => {
          return data.id !== action.id;
        },
      );
      return {
        ...state,
        posts: deletedPosts,
      };
    },
  ),
);

export const postsReducer = (state: PostStateType, action: Action) => {
  return _postsReducer(state, action);
};
