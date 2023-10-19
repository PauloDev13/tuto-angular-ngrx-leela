import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly httpClient = inject(HttpClient);

  login(email: string, password: string): Observable<NonNullable<unknown>> {
    return this.httpClient.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_kEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );
  }
}
