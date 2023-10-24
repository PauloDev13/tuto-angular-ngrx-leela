import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, Observable, switchMap, tap } from 'rxjs';

import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { AppState } from '../../store/app.state';
import { setLoadingSpinner } from '../../store/shared/shared.action';
import {
  addPost,
  addPostSuccess,
  loadPost,
  loadPostSuccess,
  updatePost,
  updatePostSuccess,
} from './post.action';

@Injectable()
export class PostEffect {
  readonly actions$ = inject(Actions);
  readonly postService = inject(PostService);
  readonly store: Store<AppState> = inject(Store);

  loadPosts$: Observable<{ posts: PostModel[] }> = createEffect(() => {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    return this.actions$.pipe(
      ofType(loadPost),
      mergeMap(() =>
        this.postService.getPosts().pipe(
          map((posts: PostModel[]) => loadPostSuccess({ posts })),
          tap(() => this.store.dispatch(setLoadingSpinner({ status: false }))),
        ),
      ),
    );
  });

  addPost$: Observable<{ post: PostModel }> = createEffect(() => {
    this.store.dispatch(setLoadingSpinner({ status: true }));
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap(({ post }) =>
        this.postService.createPost(post).pipe(
          map(data => {
            const newPost = { ...post, id: data.name };
            return addPostSuccess({ post: newPost });
          }),
          tap(() => this.store.dispatch(setLoadingSpinner({ status: false }))),
        ),
      ),
    );
  });

  updatePost$: Observable<{ post: PostModel }> = createEffect(() => {
    return this.actions$.pipe(
      ofType(updatePost),
      switchMap(({ post }) =>
        this.postService.updatePost(post).pipe(
          map((post: PostModel) => {
            console.log('EFFECTS', post);
            return updatePostSuccess({ post });
          }),
        ),
      ),
    );
  });
}
