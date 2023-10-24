import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { PostModel } from '../../models/post.model';
import { AppState } from '../../store/app.state';
import { FormUtilsService } from '../shared/form-utils/form-utils.service';
import { updatePost } from '../state/post.action';
import { selectPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  postForm!: FormGroup;
  post!: PostModel | undefined;
  postSubscription!: Subscription;

  readonly formService = inject(FormUtilsService);
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly store: Store<AppState> = inject(Store);

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const post$ = this.store.select(selectPostById(id));

      this.postSubscription = post$.subscribe(post => {
        this.post = post;
        this.createForm();
      });
    });
  }

  createForm(): void {
    this.postForm = new FormGroup({
      id: new FormControl(this.post?.id),
      title: new FormControl(this.post?.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post?.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  updatePost(): void {
    if (this.postForm.valid) {
      this.store.dispatch(updatePost({ post: this.postForm.value }));
      this.postForm.reset();
      this.router.navigate(['/posts']);
    } else {
      this.formService.validateAllFormFields(this.postForm);
    }
  }

  showDescriptionErrors(): string {
    let msg = '';
    if (this.description?.touched && this.description?.invalid) {
      if (this.description.errors?.['required']) {
        msg = 'Description is required';
      }
      if (this.description.errors?.['minlength']) {
        msg = 'Description should be of minimum 10 characters';
      }
    }
    return msg;
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
