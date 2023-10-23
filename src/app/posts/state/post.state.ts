import { PostModel } from '../../models/post.model';

export interface PostsState {
  posts: PostModel[];
}

export const initialState: PostsState = {
  posts: [],
};
