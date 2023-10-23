import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { PostModel } from '../../models/post.model';
import { PostStateType, PostType } from '../types/post.type';
import {
  addPost,
  loadPostSuccess,
  removePost,
  updatePost,
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

  on(addPost, (state: PostsState, action: PostType): PostsState => {
    const newPost = { ...action.post };
    newPost.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, newPost],
    };
  }),
  on(updatePost, (state: PostsState, { post }): PostsState => {
    const updatedPosts: Array<PostModel> = state.posts.map(
      (data: PostModel) => {
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
