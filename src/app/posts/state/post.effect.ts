import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, Observable } from 'rxjs';

import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';
import { AppState } from '../../store/app.state';
import { loadPost, loadPostSuccess } from './post.action';
import { PostsState } from './post.state';

@Injectable()
export class PostEffect {
  readonly actions$ = inject(Actions);
  readonly postService = inject(PostService);
  readonly store: Store<AppState> = inject(Store);

  loadPosts$: Observable<PostsState> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPost),
      mergeMap(() =>
        this.postService
          .loadPosts()
          .pipe(map((posts: PostModel[]) => loadPostSuccess({ posts }))),
      ),
      // tap(() => this.store.dispatch(setLoadingSpinner({ status: false }))),
    );
  });
}
