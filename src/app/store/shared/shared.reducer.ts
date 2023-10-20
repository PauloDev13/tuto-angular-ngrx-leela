import { Action, createReducer, on } from '@ngrx/store';

import { setErrorMessage, setLoadingSpinner } from './shared.action';
import { initialSharedState, SharedState } from './shared.state';

const _sharedReducer = createReducer(
  initialSharedState,
  on(
    setLoadingSpinner,
    (state: SharedState, action: { status: boolean }): SharedState => {
      return {
        ...state,
        showLoading: action.status,
      };
    },
  ),
  on(
    setErrorMessage,
    (state: SharedState, action: { message: string }): SharedState => {
      return {
        ...state,
        errorMessage: action.message,
      };
    },
  ),
);

export const sharedReducer = (
  state: SharedState | undefined,
  action: Action,
) => {
  return _sharedReducer(state, action);
};
