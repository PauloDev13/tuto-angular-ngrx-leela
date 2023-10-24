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

  getPosts(): Observable<PostModel[]> {
    return this.httpCliente
      .get<PostModel[]>(`${environment.FIREBASE_API_URL}/posts.json`)
      .pipe(
        map((data: PostModel[]) => {
          const posts: Array<PostModel> = [];
          for (const postsKey in data) {
            posts.push({ ...data[postsKey], id: postsKey });
          }
          return posts;
        }),
      );
  }
  createPost(post: PostModel): Observable<{ name: string }> {
    return this.httpCliente.post<{ name: string }>(
      `${environment.FIREBASE_API_URL}/posts.json`,
      post,
    );
  }
  updatePost(post: PostModel): Observable<PostModel> {
    const postUpdated = {
      [post.id as string]: { title: post.title, description: post.description },
    };
    return this.httpCliente.patch<PostModel>(
      `${environment.FIREBASE_API_URL}/posts.json`,
      postUpdated,
    );
  }
}
