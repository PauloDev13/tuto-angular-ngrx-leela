import { createAction, props } from '@ngrx/store';

import { PostModel } from '../../models/post.model';

export const ADD_POST = '[post page] add post';

export const addPost = createAction(ADD_POST, props<{ post: PostModel }>());
