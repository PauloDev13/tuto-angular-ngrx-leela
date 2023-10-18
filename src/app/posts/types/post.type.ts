import { PostModel } from '../../models/post.model';
import { PostsState } from '../state/post.state';

export type PostType = {
  post: PostModel;
};

export type PostStateType = PostsState | undefined;
