import { createAction, props } from '@ngrx/store';

import { PostModel } from '../../models/post.model';

export const ADD_POST = '[post page] add post';
export const UPDATE_POST = '[post page] update post';
export const REMOVE_POST = '[post page] remove post';

export const addPost = createAction(ADD_POST, props<{ post: PostModel }>());
export const updatePost = createAction(
  UPDATE_POST,
  props<{ post: PostModel }>(),
);

export const removePost = createAction(REMOVE_POST, props<{ id: string }>());
