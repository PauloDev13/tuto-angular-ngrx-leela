import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const selectGetAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const selectIsAuthenticated = createSelector(
  selectGetAuthState,
  (state: AuthState) => {
    return !!state.user;
  },
);

export const selectUser = createSelector(selectGetAuthState, ({ user }) => {
  return user?.email;
});

export const selectGetToken = createSelector(selectGetAuthState, ({ user }) => {
  return user ? user?.token : null;
});
