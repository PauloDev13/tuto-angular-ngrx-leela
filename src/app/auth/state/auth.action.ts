import { createAction, props } from '@ngrx/store';

import { AuthResponseFail, UserModel } from '../../models/user.model';

export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

export const SIGNUP_START = '[auth page] signup start';
export const SIGNUP_SUCCESS = '[auth page] signup success';

export const AUTO_LOGIN = '[auth page] auto login';

export const AUTO_LOGOUT = '[auth page] auto logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>(),
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: UserModel; redirect: boolean }>(),
);

export const loginFail = createAction(
  LOGIN_FAIL,
  props<{ res: AuthResponseFail }>(),
);

export const signupStart = createAction(
  SIGNUP_START,
  props<{ email: string; password: string }>(),
);
export const signupSuccess = createAction(
  SIGNUP_SUCCESS,
  props<{ user: UserModel; redirect: boolean }>(),
);

export const autoLogin = createAction(AUTO_LOGIN);
export const autoLogout = createAction(AUTO_LOGOUT);
