import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PostModel } from '../../models/post.model';
import { RouterStateUrl } from '../../store/router/custom-serializer';
import { selectCurrentRoute } from '../../store/router/routerSelector';
import { postsSelectors, PostsState } from './post.state';

export const POST_STATE_NAME = 'posts';

const selectPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const selectPosts = createSelector(
  selectPostsState,
  postsSelectors.selectAll,
);

export const selectPostById = createSelector(
  selectPosts,
  selectCurrentRoute,
  (posts: PostModel[], router: RouterStateUrl): PostModel | undefined => {
    return posts
      ? posts.find((post: PostModel) => post.id === router.params['id'])
      : undefined;
  },
);
