import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly httpCliente = inject(HttpClient);
  readonly store = inject(Store);

  loadPosts(): Observable<PostModel[]> {
    return this.httpCliente
      .get<PostModel[]>(`${environment.FIREBASE_API_URL}/posts.json`)
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
