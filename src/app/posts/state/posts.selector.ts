import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostsState } from './post.state';

const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectPosts = createSelector(selectPostsState, state => {
  return state.posts;
});

export const selectPostById = (postId: string | null) => {
  return createSelector(selectPostsState, (state: PostsState) => {
    return state.posts.find(post => post.id === postId);
  });
};
