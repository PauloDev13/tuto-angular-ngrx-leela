import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.state';
import { FormUtilsService } from '../shared/form-utils/form-utils.service';
import { addPost } from '../state/post.action';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  readonly formService = inject(FormUtilsService);
  readonly store: Store<AppState> = inject(Store);

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  addPost(): void {
    if (this.postForm.valid) {
      this.store.dispatch(addPost({ post: this.postForm.value }));
      this.postForm.reset();
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
}
