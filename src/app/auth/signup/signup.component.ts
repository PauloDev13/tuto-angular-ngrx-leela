import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { FormUtilsService } from '../../posts/shared/form-utils/form-utils.service';
import { AppState } from '../../store/app.state';
import { setLoadingSpinner } from '../../store/shared/shared.action';
import { signupStart } from '../state/auth.action';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  readonly formService = inject(FormUtilsService);
  readonly store: Store<AppState> = inject(Store);

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  ngOnInit(): void {
    this.createSignupForm();
  }

  createSignupForm(): void {
    this.signupForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSignupSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;

      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(signupStart({ email, password }));
      console.log(email, password);
    } else {
      this.formService.validateAllFormFields(this.signupForm);
    }
  }
}
