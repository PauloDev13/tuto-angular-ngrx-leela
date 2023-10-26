import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { selectIsAuthenticated } from '../auth/state/auth.selector';
import { AppState } from '../store/app.state';
import { setLoadingSpinner } from '../store/shared/shared.action';

export const authGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    map(authenticate => {
      if (!authenticate) {
        store.dispatch(setLoadingSpinner({ status: false }));
        return router.parseUrl('auth');
      }
      return true;
    }),
  );
};
