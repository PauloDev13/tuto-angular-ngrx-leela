import { postsReducer } from '../posts/state/post.reducer';
import { PostsState } from '../posts/state/post.state';

export interface AppState {
  posts: PostsState;
}

export const appReducer = {
  posts: postsReducer,
};
