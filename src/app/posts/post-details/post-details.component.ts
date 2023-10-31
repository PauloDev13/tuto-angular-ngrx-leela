import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { PostModel } from '../../models/post.model';
import { AppState } from '../../store/app.state';
import { selectPostById } from '../state/posts.selector';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  postDetails$!: Observable<PostModel | undefined>;

  readonly store: Store<AppState> = inject(Store);

  ngOnInit(): void {
    this.postDetails$ = this.store.select(selectPostById);
  }
}
