import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, Observable, of, tap } from 'rxjs';

import { AuthResponseDataModel } from '../../models/auth-response-data.model';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/shared/shared.action';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  signupStart,
  signupSuccess,
} from './auth.action';

@Injectable()
export class AuthEffect {
  readonly actions$ = inject(Actions);
  readonly authService = inject(AuthService);
  readonly store: Store<AppState> = inject(Store);
  readonly router = inject(Router);

  login$: Observable<{ user: UserModel } | { message: string }> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginStart),
        mergeMap((action: { email: string; password: string }) =>
          this.authService.login(action.email, action.password).pipe(
            map((data: AuthResponseDataModel) => {
              const user: UserModel = this.authService.formatUser(data);
              this.authService.setUserLocalStorage(user);
              return loginSuccess({ user, redirect: true });
            }),
            catchError(errResponse => {
              const message: string = this.authService.getErrorMessage(
                errResponse.error.error.message,
              );
              return of(setErrorMessage({ message }));
            }),
          ),
        ),
        tap((): void => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          this.store.dispatch(setLoadingSpinner({ status: false }));
        }),
      );
    },
  );

  signup$: Observable<{ user: UserModel } | { message: string }> = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signupStart),
        mergeMap(({ email, password }) =>
          this.authService.signUp(email, password).pipe(
            map((data: AuthResponseDataModel) => {
              const user: UserModel = this.authService.formatUser(data);
              this.authService.setUserLocalStorage(user);
              return signupSuccess({ user, redirect: true });
            }),
            catchError(errResponse => {
              const message: string = this.authService.getErrorMessage(
                errResponse.error.error.message,
              );
              return of(setErrorMessage({ message }));
            }),
          ),
        ),
        tap((): void => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          this.store.dispatch(setLoadingSpinner({ status: false }));
        }),
      );
    },
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const user = this.authService.getUserFromLocalStorage() as UserModel;
        return of(loginSuccess({ user, redirect: false }));
      }),
    );
  });

  autoLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map(() => {
          this.authService.logout();
          this.router.navigate(['auth']);
        }),
      );
    },
    { dispatch: false },
  );

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action: { user: UserModel; redirect: boolean }) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        }),
      );
    },
    { dispatch: false },
  );
}
