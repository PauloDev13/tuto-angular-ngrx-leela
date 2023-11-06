import { Action, ActionReducer, createReducer, on } from '@ngrx/store';

import { PostModel } from '../../models/post.model';
import { PostStateType } from '../types/post.type';
import {
  addPostSuccess,
  loadPostSuccess,
  removePostSuccess,
  updatePostSuccess,
} from './post.action';
import { initialState, postsAdapter, PostsState } from './post.state';

const _postsReducer: ActionReducer<PostsState> = createReducer(
  initialState,
  on(loadPostSuccess, (state: PostsState, { posts }): PostsState => {
    return postsAdapter.setAll(posts, state);
  }),

  on(
    addPostSuccess,
    (state: PostsState, action: { post: PostModel }): PostsState => {
      return postsAdapter.addOne(action.post, state);
    },
  ),

  on(updatePostSuccess, (state: PostsState, { post }): PostsState => {
    return postsAdapter.updateOne(post, state);
  }),

  on(removePostSuccess, (state: PostsState, { id }): PostsState => {
    return postsAdapter.removeOne(id as string, state);
  }),
);

export const postsReducer = (state: PostStateType, action: Action) => {
  return _postsReducer(state, action);
};
