import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { PostModel } from '../../models/post.model';
import { AppState } from '../../store/app.state';
import { selectPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  post!: PostModel | undefined;
  readonly route = inject(ActivatedRoute);
  readonly store: Store<AppState> = inject(Store);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const post$ = this.store.select(selectPostById(id));

      post$.subscribe(post => {
        this.post = post;
      });
    });
  }
}
