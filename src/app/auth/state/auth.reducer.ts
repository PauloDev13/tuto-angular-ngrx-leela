import { Action, createReducer, on } from '@ngrx/store';

import { UserModel } from '../../models/user.model';
import { loginSuccess, signupSuccess } from './auth.action';
import { AuthState, initialAuthState } from './auth.state';

const _authReducer = createReducer(
  initialAuthState,
  on(
    loginSuccess,
    (state: AuthState, action: { user: UserModel }): AuthState => {
      return {
        ...state,
        user: action.user,
      };
    },
  ),
  on(signupSuccess, (state: AuthState, { user }): AuthState => {
    return {
      ...state,
      user,
    };
  }),
);

export const authReducer = (state: AuthState | undefined, action: Action) => {
  return _authReducer(state, action);
};
