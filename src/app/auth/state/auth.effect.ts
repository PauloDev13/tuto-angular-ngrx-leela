import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { loginStart, loginSuccess } from './auth.action';

@Injectable()
export class AuthEffect {
  readonly actions$ = inject(Actions);
  readonly authService = inject(AuthService);

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action: { email: string; password: string }) =>
        this.authService
          .login(action.email, action.password)
          .pipe(map(data => loginSuccess())),
      ),
    );
  });
}
