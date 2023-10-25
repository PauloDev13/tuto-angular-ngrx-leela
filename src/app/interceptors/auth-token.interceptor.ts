import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, Observable } from 'rxjs';

import { selectGetToken } from '../auth/state/auth.selector';
import { AppState } from '../store/app.state';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  readonly store: Store<AppState> = inject(Store);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<string>> {
    return this.store.select(selectGetToken).pipe(
      mergeMap((token: string | null) => {
        if (!token) {
          return next.handle(request);
        }
        const modifiedReq = request.clone({
          params: request.params.append('auth', token),
        });
        return next.handle(modifiedReq);
      }),
    );
  }
}
