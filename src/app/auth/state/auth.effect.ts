import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, Observable, tap } from 'rxjs';

import { AuthResponseDataModel } from '../../models/auth-response-data.model';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../store/app.state';
import { setLoadingSpinner } from '../../store/shared/shared.action';
import { loginStart, loginSuccess } from './auth.action';

@Injectable()
export class AuthEffect {
  readonly actions$ = inject(Actions);
  readonly authService = inject(AuthService);
  readonly store: Store<AppState> = inject(Store);

  login$: Observable<{ user: UserModel }> = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      mergeMap((action: { email: string; password: string }) =>
        this.authService.login(action.email, action.password).pipe(
          map((data: AuthResponseDataModel) => {
            // this.store.dispatch(setLoadingSpinner({ status: false }));
            const user: UserModel = this.authService.formatUser(data);
            return loginSuccess({ user });
          }),
        ),
      ),
      tap(() => this.store.dispatch(setLoadingSpinner({ status: false }))),
    );
  });
}
