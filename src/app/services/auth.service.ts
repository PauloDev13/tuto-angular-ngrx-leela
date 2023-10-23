import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment.development';
import { autoLogout } from '../auth/state/auth.action';
import { AuthResponseDataModel } from '../models/auth-response-data.model';
import { UserDataModel } from '../models/user-data.model';
import { UserModel } from '../models/user.model';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval!: number | null;

  readonly httpClient = inject(HttpClient);
  readonly store: Store<AppState> = inject(Store);

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

  signUp(email: string, password: string): Observable<AuthResponseDataModel> {
    return this.httpClient.post<AuthResponseDataModel>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_kEY}`,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    );
  }

  logout() {
    const userDataString = localStorage.getItem('dataUser');
    if (userDataString) {
      localStorage.removeItem('dataUser');

      if (this.timeoutInterval) {
        clearTimeout(this.timeoutInterval);
        this.timeoutInterval = null;
      }
    }
  }

  formatUser(data: AuthResponseDataModel): UserModel {
    return new UserModel(
      data.email,
      data.idToken,
      data.localId,
      new Date(Date.now() + Number(data.expiresIn) * 1000),
    );
  }

  setUserLocalStorage(user: UserModel): void {
    if (user) {
      localStorage.setItem('dataUser', JSON.stringify(user));
      this.runTimeoutInterval(user);
    }
  }

  runTimeoutInterval(user: UserModel) {
    const todayDate = new Date().getTime();
    const expirationDate = user.expirationDate.getTime();
    const timeInterval = expirationDate - todayDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
    }, timeInterval);
  }

  getUserFromLocalStorage(): UserModel | null {
    const userDataString: string | null = localStorage.getItem('dataUser');

    if (userDataString) {
      const userData: UserDataModel = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new UserModel(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate,
      );
      this.runTimeoutInterval(user);
      return user;
    }

    return null;
  }

  getErrorMessage(message: string): string {
    switch (message) {
      case 'USER_DISABLED':
        return 'Usuário bloqueado. Fale com o administrador.';
      case 'INVALID_LOGIN_CREDENTIALS':
        return 'Usuário e/ou senha inválido';
      case 'EMAIL_EXISTS':
        return 'Email informado já está cadastrado.';
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return 'Usuário temporariamente desativado. Fale o administrador.';
      default:
        return 'Erro desconhecido. Fale com o administrador.';
    }
  }
}
