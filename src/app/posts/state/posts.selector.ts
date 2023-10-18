import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostsState } from './post.state';

export const POST_STATE_NAME = 'posts';

const selectPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const selectPosts = createSelector(selectPostsState, state => {
  return state.posts;
});

export const selectPostById = (postId: string | null) => {
  return createSelector(selectPostsState, (state: PostsState) => {
    return state.posts.find(post => post.id === postId);
  });
};
