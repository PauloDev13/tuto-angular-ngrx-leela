import { Action, createReducer } from '@ngrx/store';

import { initialAuthState } from './auth.state';

const _authReducer = createReducer(initialAuthState);

export const authReducer = (state: any, action: Action) => {
  return _authReducer(state, action);
};
