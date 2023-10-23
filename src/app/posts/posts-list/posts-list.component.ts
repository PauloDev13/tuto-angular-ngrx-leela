import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { PostModel } from '../../models/post.model';
import { AppState } from '../../store/app.state';
import { loadPost, removePost } from '../state/post.action';
import { selectPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  posts$: Observable<PostModel[]> = of([]);

  readonly store: Store<AppState> = inject(Store);

  ngOnInit(): void {
    this.posts$ = this.store.select(selectPosts);
    this.store.dispatch(loadPost());
  }

  onRemove(id: string | undefined) {
    if (confirm('Confirma exclusão')) {
      this.store.dispatch(removePost({ id }));
    }
  }
}
