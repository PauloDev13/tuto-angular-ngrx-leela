import { Action, createReducer, on } from '@ngrx/store';

import { initialAuthState } from './auth.state';

const _authReducer = createReducer(initialAuthState, on());

export const authReducer = (state: any, action: Action) => {
  return _authReducer(state, action);
};
