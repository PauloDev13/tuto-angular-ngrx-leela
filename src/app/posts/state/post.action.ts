import { createAction, props } from '@ngrx/store';

import { PostModel } from '../../models/post.model';

export const LOAD_POST = '[post page] load post';
export const LOAD_POST_SUCCESS = '[post page] load post success';

export const ADD_POST = '[post page] add post';
export const ADD_POST_SUCCESS = '[post page] add post success';

export const UPDATE_POST = '[post page] update post';
export const REMOVE_POST = '[post page] remove post';

export const loadPost = createAction(LOAD_POST);
export const loadPostSuccess = createAction(
  LOAD_POST_SUCCESS,
  props<{ posts: PostModel[] }>(),
);

export const addPost = createAction(ADD_POST, props<{ post: PostModel }>());
export const addPostSuccess = createAction(
  ADD_POST_SUCCESS,
  props<{ post: PostModel }>(),
);

export const updatePost = createAction(
  UPDATE_POST,
  props<{ post: PostModel }>(),
);

export const removePost = createAction(
  REMOVE_POST,
  props<{ id: string | undefined }>(),
);
