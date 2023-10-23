import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';

import { PostService } from '../../services/post.service';
import { AppState } from '../../store/app.state';
import { loadPost, loadPostSuccess } from './post.action';

@Injectable()
export class PostEffect {
  readonly actions$ = inject(Actions);
  readonly postService = inject(PostService);
  readonly store: Store<AppState> = inject(Store);

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPost),
      mergeMap(() => {
        return this.postService.loadPosts().pipe(
          map(posts => {
            return loadPostSuccess({ posts });
          }),
        );
      }),
      // tap(() => this.store.dispatch(setLoadingSpinner({ status: false }))),
    );
  });

  // spinner$ = createAction(() => {
  //   return this.actions$.pipe(
  //     ofType(loadPost),
  //     tap(() => {
  //       return '';
  //     }),
  //   );
  // });
}
