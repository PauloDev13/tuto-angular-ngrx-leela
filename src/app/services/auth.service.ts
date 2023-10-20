import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { AuthResponseDataModel } from '../models/auth-response-data.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly httpClient = inject(HttpClient);

  login(email: string, password: string): Observable<AuthResponseDataModel> {
    return this.httpClient.post<AuthResponseDataModel>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_kEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );
  }

  formatUser(data: AuthResponseDataModel): UserModel {
    return new UserModel(
      data.email,
      data.idToken,
      data.localId,
      new Date(Date.now() + Number(data.expiresIn) * 1000),
    );
  }
}
