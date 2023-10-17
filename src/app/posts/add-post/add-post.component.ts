import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormUtilsService } from '../shared/form-utils/form-utils.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  readonly formService = inject(FormUtilsService);

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  ngOnInit() {
    this.postForm = new FormGroup({
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

  addPost() {
    if (this.postForm.valid) {
      console.log(this.postForm.value);
      this.postForm.reset();
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
