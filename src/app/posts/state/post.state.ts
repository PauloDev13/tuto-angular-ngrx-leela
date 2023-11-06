import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { PostModel } from '../../models/post.model';

export type PostsState = EntityState<PostModel>;

export const postsAdapter = createEntityAdapter<PostModel>();

export const initialState: PostsState = postsAdapter.getInitialState();

export const postsSelectors = postsAdapter.getSelectors();
