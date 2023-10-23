import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly httpCliente = inject(HttpClient);
  readonly store = inject(Store);

  loadPosts(): Observable<PostModel[]> {
    return this.httpCliente
      .get<PostModel[]>(
        `https://tuto-angular-ngrx-leela-default-rtdb.firebaseio.com/posts.json`,
      )
      .pipe(
        // tap(() => this.store.dispatch(setLoadingSpinner({ status: true }))),
        map((data: PostModel[]) => {
          const posts: Array<PostModel> = [];
          for (const postsKey in data) {
            posts.push({ ...data[postsKey], id: postsKey });
          }
          return posts;
        }),
      );
  }
}
