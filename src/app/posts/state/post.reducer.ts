import { Action, createReducer, on } from '@ngrx/store';

import { PostStateType, PostType } from '../types/post.type';
import { addPost } from './post.action';
import { initialState, PostsState } from './post.state';

const _postsReducer = createReducer(
  initialState,
  on(addPost, (state: PostsState, action: PostType): PostsState => {
    const post = { ...action.post };
    post.id = (state.posts.length + 1).toString();

    return {
      ...state,
      posts: [...state.posts, action.post],
    };
  }),
);

export const postsReducer = (state: PostStateType, action: Action) => {
  return _postsReducer(state, action);
};
