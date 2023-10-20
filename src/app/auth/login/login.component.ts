import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { FormUtilsService } from '../../posts/shared/form-utils/form-utils.service';
import { AppState } from '../../store/app.state';
import { setLoadingSpinner } from '../../store/shared/shared.action';
import { loginStart } from '../state/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  readonly formService = inject(FormUtilsService);
  readonly store: Store<AppState> = inject(Store);

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(
        loginStart({
          email,
          password,
        }),
      );
      // this.loginForm.reset();
    } else {
      this.formService.validateAllFormFields(this.loginForm);
    }
  }
}
